import React, { useState, useEffect } from 'react';
import '../App.css';

const ParentHome = ({ session, onLogin, onLogout, setPage }) => {
  const [showLoginForm, setShowLoginForm] = useState(!session);
  const [parentIdentifier, setParentIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [selectedChild, setSelectedChild] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  // Sample homework data with more variety
  const homeworkData = [
    { id: 1, subject: "Mathematics", class: "8A", school: "Sri Chaitanya School", date: "2026-03-31", content: "Chapter 5: Revision Exercise + Practice Problems", teacher: "Mr. Sharma", due: "Tomorrow" },
    { id: 2, subject: "English", class: "8A", school: "Sri Chaitanya School", date: "2026-03-31", content: "Essay Writing: \"My Future Dreams\" (300-400 words)", teacher: "Ms. Priya", due: "3 days" },
    { id: 3, subject: "Science", class: "8A", school: "Sri Chaitanya School", date: "2026-03-31", content: "Project: Renewable Energy Sources", teacher: "Dr. Verma", due: "1 week" },
    { id: 4, subject: "Mathematics", class: "6C", school: "Sri Chaitanya School", date: "2026-03-31", content: "Basic Algebra: Solving Linear Equations", teacher: "Mr. Sharma", due: "2 days" },
    { id: 5, subject: "English", class: "6C", school: "Sri Chaitanya School", date: "2026-03-31", content: "Reading Comprehension: Chapter 3", teacher: "Ms. Priya", due: "Tomorrow" },
    { id: 6, subject: "Science", class: "6C", school: "Sri Chaitanya School", date: "2026-03-31", content: "Human Body Systems", teacher: "Dr. Verma", due: "4 days" },
    { id: 7, subject: "Mathematics", class: "7A", school: "Lotus High School", date: "2026-03-31", content: "Geometry: Properties of Triangles", teacher: "Dr. Patel", due: "Tomorrow" },
    { id: 8, subject: "English", class: "7A", school: "Lotus High School", date: "2026-03-31", content: "Grammar: Tenses and Voice", teacher: "Mrs. Rani", due: "2 days" },
    { id: 9, subject: "Science", class: "7A", school: "Lotus High School", date: "2026-03-31", content: "Chemical Reactions and Equations", teacher: "Dr. Patel", due: "3 days" },
    { id: 10, subject: "Mathematics", class: "5B", school: "Lotus High School", date: "2026-03-31", content: "Fractions and Decimals", teacher: "Dr. Patel", due: "Tomorrow" },
    { id: 11, subject: "English", class: "5B", school: "Lotus High School", date: "2026-03-31", content: "Vocabulary Building", teacher: "Mrs. Rani", due: "2 days" },
    { id: 12, subject: "Science", class: "5B", school: "Lotus High School", date: "2026-03-31", content: "Plants and Photosynthesis", teacher: "Dr. Patel", due: "4 days" },
    { id: 13, subject: "Mathematics", class: "8B", school: "Delhi Public School", date: "2026-03-31", content: "Linear Equations in Two Variables", teacher: "Mr. Kumar", due: "Tomorrow" },
    { id: 14, subject: "English", class: "8B", school: "Delhi Public School", date: "2026-03-31", content: "Literature: The Merchant of Venice", teacher: "Ms. Sharma", due: "3 days" },
    { id: 15, subject: "Science", class: "8B", school: "Delhi Public School", date: "2026-03-31", content: "Electricity and Magnetism", teacher: "Mr. Kumar", due: "1 week" },
    { id: 16, subject: "Mathematics", class: "6D", school: "Delhi Public School", date: "2026-03-31", content: "Ratio and Proportion", teacher: "Mr. Kumar", due: "2 days" },
    { id: 17, subject: "English", class: "6D", school: "Delhi Public School", date: "2026-03-31", content: "Creative Writing: Short Stories", teacher: "Ms. Sharma", due: "Tomorrow" },
    { id: 18, subject: "Science", class: "6D", school: "Delhi Public School", date: "2026-03-31", content: "Weather and Climate", teacher: "Mr. Kumar", due: "4 days" }
  ];

  // Sample parent data (email or phone login)
  const parentData = [
    { phone: "9876543210", email: "reddy@parent.com", password: "parent123", name: "Mr. Reddy", students: ["Rahul Reddy - Class 8A - Sri Chaitanya School", "Isha Reddy - Class 6C - Sri Chaitanya School"] },
    { phone: "9765432101", email: "patel@parent.com", password: "parent123", name: "Mr. Patel", students: ["Ananya Patel - Class 7A - Lotus High School", "Dev Patel - Class 5B - Lotus High School"] },
    { phone: "9654321012", email: "verma@parent.com", password: "parent123", name: "Mr. Verma", students: ["Manish Verma - Class 8B - Delhi Public School", "Priya Verma - Class 6D - Delhi Public School"] }
  ];

  const schools = ["Sri Chaitanya School", "Lotus High School", "Delhi Public School"];
  const classes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const sections = ["A", "B", "C", "D"];

  useEffect(() => {
    if (session) {
      setShowLoginForm(false);
    }
  }, [session]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!parentIdentifier || !password) {
      setLoginMessage("Please enter email/phone and password");
      return;
    }

    const parent = parentData.find(p =>
      (p.phone === parentIdentifier || p.email === parentIdentifier) && p.password === password
    );

    if (parent) {
      const sessionData = {
        parentName: parent.name,
        parentPhone: parent.phone,
        parentEmail: parent.email,
        students: parent.students
      };
      onLogin(sessionData);
      setShowLoginForm(false);
      setLoginMessage("");
    } else {
      setLoginMessage("Invalid email/phone or password");
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
    const childClassText = parts[1] || ""; // "Class 8A"
    const classSection = childClassText.replace(/Class\s*/i, "").trim();

    let filtered = homeworkData;

    if (classSection) {
      filtered = filtered.filter(hw => hw.class === classSection);
    }

    filtered = filtered.filter(hw => hw.date === searchDate);

    return filtered;
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
              const childValue = e.target.value;
              setSelectedChild(childValue);
              if (childValue.startsWith('Rahul Reddy')) {
                setSearchDate('2026-03-31');
              } else {
                setSearchDate('');
              }
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
                  <p style={{ fontSize: '14px', color: '#333', marginBottom: '10px', lineHeight: '1.6' }}>{hw.content}</p>
                  <p style={{ fontSize: '12px', color: '#666', margin: '6px 0' }}><strong>Teacher:</strong> {hw.teacher}</p>
                  <p style={{ fontSize: '12px', color: '#666', margin: '6px 0' }}><strong>Due Date:</strong> {hw.due}</p>
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