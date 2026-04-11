import React, { useState, useEffect } from 'react';
import '../App.css';


const TeacherHome = ({ session, onLogin, onLogout, setPage }) => {
  const [schoolEmail, setSchoolEmail] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [homeworkText, setHomeworkText] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(!session);

  

  const classes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const sections = ["A", "B", "C", "D", "E"];
  const subjects = ["Mathematics", "English", "Physics", "Chemistry", "Biology", "Social Studies", "Hindi" ,"Telugu", "Computer"];

  useEffect(() => {
    if (session) {
      setShowLoginForm(false);
    }
  }, [session]);

 const handleLoginSubmit = async (e) => {
  e.preventDefault();

  if (!schoolEmail || !phoneNumber || !password || !schoolName || !schoolAddress) {
    setUploadMessage("Please fill all login fields");
    return;
  }

  try {
    const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const res = await fetch(`${API_BASE}/login-teacher`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: schoolEmail,
        phone: phoneNumber,
        password,
        schoolName,
        schoolAddress
      })
    });

    const data = await res.json();

    if (data.success) {
      onLogin({
        schoolName: data.teacher.school,
        schoolAddress: data.teacher.schoolAddress,
        teacherName: data.teacher.name,
        teacherEmail: data.teacher.email,
        teacherPhone: data.teacher.phone
      });

      setUploadMessage("");
      setShowLoginForm(false);
    } else {
      setUploadMessage(data.message || "Invalid login");
    }
  } catch (error) {
    console.error(error);
    setUploadMessage("Server error");
  }
};

  const handleHomeworkUpload = async (e) => {
  e.preventDefault();

  if (!selectedClass || !selectedSection || !selectedSubject || !selectedDate) {
    setUploadMessage("Please select all fields");
    return;
  }

  if (!homeworkText) {
    setUploadMessage("Please enter homework");
    return;
  }

  try {
    const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const response = await fetch(`${API_BASE}/add-homework`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        class: selectedClass,
        section: selectedSection,
        subject: selectedSubject,
        date: selectedDate,
        text: homeworkText,
        teacher: session.teacherName,
        school: session.schoolName,
        schoolAddress: session.schoolAddress
      })
    });

    const data = await response.json();

    if (response.ok) {
      setUploadMessage("Homework uploaded successfully ✅");
      setHomeworkText("");
    } else {
      setUploadMessage("Error uploading ❌");
    }

  } catch (error) {
    console.error(error);
    setUploadMessage("Server error ❌");
  }
};


  const handleLogoutClick = () => {
    setShowLoginForm(true);
    setSchoolEmail("");
    setSchoolName("");
    setSchoolAddress("");
    setPhoneNumber("");
    setPassword("");
    setSelectedClass("");
    setSelectedSection("");
    setSelectedSubject("");
    setSelectedDate("");
    setHomeworkText("");
    setUploadMessage("");
    onLogout();
    setPage("role");
  };

  if (showLoginForm || !session) {
    return (
      <div className="container auth-page">
        <div className="auth-card">
          <h1 className="title">Teacher Login</h1>
          <form onSubmit={handleLoginSubmit} className="form-container">
          <div className="form-group">
            <label>School Email:</label>
            <input
              type="email"
              placeholder="Enter your school email"
              value={schoolEmail}
              onChange={(e) => setSchoolEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>School Name:</label>
            <input
              type="text"
              placeholder="Enter school name"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>School Address:</label>
            <input
              type="text"
              placeholder="Enter school address or branch"
              value={schoolAddress}
              onChange={(e) => setSchoolAddress(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px' }}>
            <button type="submit" className="role-btn" style={{ flex: 1, maxWidth: '150px' }}>Login</button>
            <button type="button" onClick={() => setPage('role')} className="role-btn" style={{ flex: 1, maxWidth: '150px' }}>Cancel</button>
          </div>
          {uploadMessage && <p style={{ color: 'red', marginTop: '10px' }}>{uploadMessage}</p>}
        </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '4rem' }}>
      <div className="header" style={{ backgroundColor: '#fafbfc', border: '1px solid #e8ebee', borderRadius: '8px', padding: '16px', marginBottom: '24px', position: 'relative' }}>
        <button onClick={handleLogoutClick} className="logout-btn" style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#666' }}>⏻</button>
        <div>
          <div className="title-container">
            <h1 className="title" style={{ marginBottom: '8px' ,color: 'black'}}>Teacher Dashboard</h1><br/>
          </div>
          <p style={{ fontSize: '14px', color: '#444' }}>
            School: <strong>{session.schoolName}</strong>
          </p>
          <p style={{ fontSize: '14px', color: '#444' }}>
            Branch/Address: <strong>{session.schoolAddress}</strong>
          </p>
          <p style={{ fontSize: '14px', color: '#444' }}>
            Teacher: <strong>{session.teacherName}</strong> | Email: <strong>{session.teacherEmail}</strong>
          </p>
        </div>
      </div>

      <form onSubmit={handleHomeworkUpload} className="form-container" style={{ marginTop: '32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div className="form-group">
            <label>Class:</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="form-input"
              required
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Section:</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="form-input"
              required
            >
              <option value="">Select Section</option>
              {sections.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Subject:</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="form-input"
              required
            >
              <option value="">Select Subject</option>
              {subjects.map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="form-input"
              required
            />
          </div>
        </div>


        <div className="form-group">
          <label>Enter Homework Text:</label>
          <textarea
            placeholder="Enter homework description or content"
            value={homeworkText}
            onChange={(e) => setHomeworkText(e.target.value)}
            className="form-input"
            rows="6"
            style={{ resize: 'vertical' }}
          />
        </div><br/>

        <button type="submit" className="role-btn">Upload Homework</button>
      </form>

      {uploadMessage && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: uploadMessage.includes('successfully') ? '#d4edda' : '#f8d7da',
          color: uploadMessage.includes('successfully') ? '#155724' : '#721c24',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          {uploadMessage}
        </div>
      )}
    </div>
  );
};

export default TeacherHome;
