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

    const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
    fetch(`${API_BASE}/get-homework`)
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
      const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_BASE}/login-parent`, {
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
    const schoolAddress = parts[3] || "";

    const cls = classSection.slice(0, -1);
    const sec = classSection.slice(-1);

    return homeworkData.filter(hw =>
      hw.class === cls &&
      hw.section === sec &&
      hw.school === school &&
      hw.schoolAddress === schoolAddress &&
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

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px' }}>
            <button type="submit" className="role-btn" style={{ flex: 1, maxWidth: '150px' }}>Login</button>
            <button type="button" onClick={() => setPage('role')} className="role-btn" style={{ flex: 1, maxWidth: '150px' }}>Cancel</button>
          </div>

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

      <div className="header" style={{ backgroundColor: '#fafbfc', border: '1px solid #e8ebee', borderRadius: '8px', padding: '16px', marginBottom: '24px', position: 'relative' }}>
        <button onClick={handleLogoutClick} className="logout-btn" style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#666' }}>⏻</button>
        <div>
          <div className="title-container">
            <h1 className="title" style={{ marginBottom: '8px', color: 'black' }}>Parent Dashboard</h1><br/>
          </div>
          <p style={{ fontSize: '14px', color: '#444' }}>
            Name: <strong>{session.parentName}</strong>
          </p>
          <p style={{ fontSize: '14px', color: '#444' }}>
            Phone: <strong>{session.parentPhone}</strong> | Email: <strong>{session.parentEmail}</strong>
          </p>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button onClick={() => setPage('addChild')}>
          Add Child
        </button>
      </div>

      {/* Select Child */}
      <div className="form-group" style={{ maxWidth: '500px', margin: '0 auto' }}>
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
        <div className="form-group" style={{ maxWidth: '500px', margin: '20px auto 0' }}>
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
        <div style={{ maxWidth: '600px', margin: '30px auto' }}>
          <h2 style={{ color: 'white', marginBottom: '20px' }}>Homework</h2>

          {getFilteredHomework().length > 0 ? (
            getFilteredHomework().map((hw, i) => (
              <div key={i} className="school-card">
                <h3>{hw.subject}</h3>
                <p>{hw.text}</p>
                <p><b>Teacher:</b> {hw.teacher}</p>
              </div>
            ))
          ) : (
            <p style={{ color: '#ccc' }}>No homework found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ParentHome;
