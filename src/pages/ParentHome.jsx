import React, { useState, useEffect } from 'react';
import '../App.css';

const ParentHome = ({ session, onLogin, onLogout, setPage }) => {
  const [showLoginForm, setShowLoginForm] = useState(!session);
  const [parentIdentifier, setParentIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [selectedChild, setSelectedChild] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [homeworkData, setHomeworkData] = useState([]);

  useEffect(() => {
    if (session) {
      setShowLoginForm(false);
    }
  }, [session]);

  // ✅ Fetch homework from backend
  useEffect(() => {
    if (!session) return;

    fetch("http://localhost:5000/get-homework")
      .then(res => res.json())
      .then(data => {
        setHomeworkData(data);
      })
      .catch(err => console.error(err));

  }, [session]);

  // ✅ Backend login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!parentIdentifier || !password) {
      setLoginMessage("Please enter email/phone and password");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/login-parent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          identifier: parentIdentifier,
          password: password
        })
      });

      const data = await res.json();

      if (data.success) {
        onLogin({
          parentName: data.parent.name,
          parentPhone: data.parent.phone,
          parentEmail: data.parent.email,
          students: data.parent.students || []
        });

        setShowLoginForm(false);
        setLoginMessage("");
      } else {
        setLoginMessage(data.message || "Invalid login");
      }

    } catch (error) {
      console.error(error);
      setLoginMessage("Server error");
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

  // ✅ Filter homework
  const getFilteredHomework = () => {
    if (!selectedChild || !searchDate) return [];

    const parts = selectedChild.split(" - ");
    const classSection = parts[1].replace("Class ", "");
    const school = parts[2];

    const cls = classSection.slice(0, -1);
    const sec = classSection.slice(-1);

    return homeworkData.filter(hw =>
      hw.class === cls &&
      hw.section === sec &&
      hw.school === school &&
      hw.date === searchDate
    );
  };

  // 🔐 LOGIN UI
  if (showLoginForm || !session) {
    return (
      <div className="container auth-page">
        <div className="auth-card">
          <h1 className="title">Parent Login</h1>

          <form onSubmit={handleLoginSubmit} className="form-container">
          <div className="form-group">
            <label>Email or Phone:</label>
            <input
              type="text"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="role-btn">Login</button>

          {loginMessage && (
            <p style={{ color: 'red', marginTop: '10px' }}>
              {loginMessage}
            </p>
          )}
        </form>
        </div>
      </div>
    );
  }

  // 🏠 DASHBOARD
  return (
    <div className="container" style={{ paddingTop: '4rem' }}>

      <div className="header">
        <h1>Parent Dashboard</h1>
        <p>
          {session.parentName} | {session.parentPhone}
        </p>

        <button onClick={handleLogoutClick}>Logout</button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button onClick={() => setPage('addChild')}>
          Add Child
        </button>
      </div>

      {/* Select Child */}
      <div className="form-group">
        <label>Select Child:</label>
        <select
          value={selectedChild}
          onChange={(e) => {
            setSelectedChild(e.target.value);
            setSearchDate("");
          }}
          className="form-input"
        >
          <option value="">-- Select Child --</option>
          {session.students?.map((student, i) => (
            <option key={i} value={student}>
              {student}
            </option>
          ))}
        </select>
      </div>

      {/* Select Date */}
      {selectedChild && (
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="form-input"
          />
        </div>
      )}

      {/* Homework Display */}
      {selectedChild && (
        <div>
          <h2>Homework</h2>

          {getFilteredHomework().length > 0 ? (
            getFilteredHomework().map((hw, i) => (
              <div key={i} className="school-card">
                <h3>{hw.subject}</h3>
                <p>{hw.text}</p>
                <p><b>Teacher:</b> {hw.teacher}</p>
              </div>
            ))
          ) : (
            <p>No homework found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ParentHome;
