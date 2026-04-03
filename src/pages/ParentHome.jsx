import React, { useState, useEffect } from 'react';
import '../App.css';
import { db } from '../firebase';
import { ref, onValue,get} from "firebase/database";

const ParentHome = ({ session, onLogin, onLogout, setPage }) => {
  const [showLoginForm, setShowLoginForm] = useState(!session);
  const [parentIdentifier, setParentIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [selectedChild, setSelectedChild] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [firebaseHomework, setFirebaseHomework] = useState([]);

  const classes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const sections = ["A", "B", "C", "D"];

  useEffect(() => {
    if (session) {
      setShowLoginForm(false);
    }
  }, [session]);

  useEffect(() => {
  if (!session) return;

  const homeworkRef = ref(db, `homework`);

  onValue(homeworkRef, (snapshot) => {
    const data = snapshot.val();
    let loadedData = [];

    if (data) {
      Object.keys(data).forEach(school => {
        Object.keys(data[school] || {}).forEach(cls => {
          Object.keys(data[school][cls] || {}).forEach(sec => {
            Object.values(data[school][cls][sec] || {}).forEach(item => {
              loadedData.push({
                ...item,
                school,
                class: cls,
                section: sec
              });
            });
          });
        });
      });
    }

    setFirebaseHomework(loadedData);
  });

}, [session]);

const handleLoginSubmit = async (e) => {
  e.preventDefault();

  if (!parentIdentifier || !password) {
    setLoginMessage("Please enter email/phone and password");
    return;
  }

  try {
    const snapshot = await get(ref(db, "parents"));

    if (snapshot.exists()) {
      const data = snapshot.val();
      let foundParent = null;

      Object.keys(data).forEach(key => {
        const parent = data[key];

        if (
          (parent.phone === parentIdentifier || parent.email === parentIdentifier) &&
          parent.password === password
        ) {
          foundParent = parent;
        }
      });

      if (foundParent) {
        const studentSnapshot = await get(ref(db, `parents/${foundParent.phone}/students`));

let students = [];

if (studentSnapshot.exists()) {
  students = studentSnapshot.val();
}

onLogin({
  parentName: foundParent.name,
  parentPhone: foundParent.phone,
  parentEmail: foundParent.email,
  students: students
});

        setShowLoginForm(false);
        setLoginMessage("");
      } else {
        setLoginMessage("Invalid email/phone or password");
      }

    } else {
      setLoginMessage("No users found. Please register.");
    }

  } catch (error) {
    setLoginMessage("Login error");
    console.error(error);
  }
};

  const handleLogoutClick = () => {
    setShowLoginForm(true);
    setParentIdentifier("");
    setPassword("");
    setSelectedChild("");
    setSearchDate("");
    setLoginMessage("");
    onLogout();
    setPage("role");
  };

  // Filter homework based on selected child, date, and subject
  const getFilteredHomework = () => {
  if (!selectedChild || !searchDate) return [];

  const parts = selectedChild.split(" - ");
  const classSection = parts[1].replace("Class ", "");
  const school = parts[2];

  const cls = classSection.slice(0, -1); // 8A → 8
  const sec = classSection.slice(-1);    // 8A → A

  return firebaseHomework.filter(hw =>
    hw.class === cls &&
    hw.section === sec &&
    hw.school === school &&
    hw.date === searchDate
  );
};

  if (showLoginForm || !session) {
    return (
      <div className="container">
        <h1 className="title">Parent Login</h1>
        <form onSubmit={handleLoginSubmit} className="form-container">
          <div className="form-group">
            <label>Email or Phone Number:</label>
            <input
              type="text"
              placeholder="Enter your email or registered phone number"
              value={parentIdentifier}
              onChange={(e) => setParentIdentifier(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="role-btn">Login</button>
          {loginMessage && <p style={{ color: 'red', marginTop: '10px' }}>{loginMessage}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '4rem' }}>
      <div className="header" style={{ backgroundColor: '#fafbfc', border: '1px solid #e8ebee', borderRadius: '8px', padding: '16px', marginBottom: '24px', position: 'relative' }}>
        <div>
          <h1 className="title" style={{ marginBottom: '8px', color: 'black' }}>Parent Dashboard</h1>
          <p style={{ fontSize: '14px', color: '#444' }}>
            Parent: <strong>{session.parentName}</strong> | Contact: <strong>{session.parentPhone}</strong>
          </p>
          {session.parentEmail && (
            <p style={{ fontSize: '14px', color: '#444' }}>
              Email: <strong>{session.parentEmail}</strong>
            </p>
          )}
        </div>
        <button onClick={handleLogoutClick} className="logout-btn" style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#666' }}>⏻</button>
      </div>

      <div style={{ marginBottom: '24px', textAlign: 'center' }}>
        <button className="role-btn" style={{ width: '180px' }} onClick={() => setPage('addChild')}>
          Add Child
        </button>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div className="form-group" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <label>Select Child:</label>
          <select
            value={selectedChild}
           onChange={(e) => {
  setSelectedChild(e.target.value);
  setSearchDate(""); // reset date when child changes
}}
            className="form-input"
          >
            <option value="">-- Select Your Child --</option>
            {session.students && session.students.map((student, index) => (
              <option key={index} value={student}>
                {student}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedChild && (
        <div style={{ marginBottom: '24px' }}>
          <div className="form-group" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <label>Homework Date:</label>
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="form-input"
            />
          </div>
        </div>
      )}

      {/* Homework Display */}
      {selectedChild && (
        <div style={{ marginTop: '32px' }}>
          <h2 className="subtitle" style={{ textAlign: 'center', marginBottom: '24px', fontSize: '20px', color: '#007bff' }}>📚 Homework for {selectedChild}</h2>
          {getFilteredHomework().length > 0 ? (
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              {getFilteredHomework().map((hw) => (
                <div key={hw.id} className="school-card" style={{ marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '16px' }}>
                  <h3 style={{ margin: '0 0 10px', fontSize: '18px', color: '#2a4f8a' }}>{hw.subject}</h3>
<p style={{ fontSize: '14px', color: '#333', marginBottom: '10px', lineHeight: '1.6' }}>
  {hw.text || "No description provided"}
</p>                  <p style={{ fontSize: '12px', color: '#666', margin: '6px 0' }}><strong>Teacher:</strong> {hw.teacher}</p>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999', backgroundColor: '#f8f9fa', borderRadius: '8px', marginTop: '20px' }}>
              <p style={{ fontSize: '16px', marginBottom: '10px' }}>📭 No homework found</p>
              <p style={{ fontSize: '13px' }}>Try selecting a class, section and date to view assignments.</p>
            </div>
          )}
        </div>
      )}

      {loginMessage && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: loginMessage.includes('successfully') ? '#d4edda' : '#f8d7da',
          color: loginMessage.includes('successfully') ? '#155724' : '#721c24',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          {loginMessage}
        </div>
      )}
    </div>
  );
};

export default ParentHome; 