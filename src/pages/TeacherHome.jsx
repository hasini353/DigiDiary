import React, { useState, useEffect } from 'react';
import '../App.css';
import { db } from '../firebase';
import { ref, push } from "firebase/database";


const TeacherHome = ({ session, onLogin, onLogout, setPage }) => {
  const [showLoginForm, setShowLoginForm] = useState(!session);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [homeworkFile, setHomeworkFile] = useState(null);
  const [homeworkText, setHomeworkText] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");

  

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

  const snapshot = await get(ref(db, "teachers"));

  if (snapshot.exists()) {
    const data = snapshot.val();

    let found = null;

    Object.values(data).forEach(teacher => {
      if (
        teacher.email === schoolEmail &&
        teacher.phone === phoneNumber &&
        teacher.password === password
      ) {
        found = teacher;
      }
    });

    if (found) {
      onLogin({
        schoolName: found.school,
        schoolPhone: "N/A",
        teacherName: found.name,
        teacherEmail: found.email,
        teacherPhone: found.phone
      });
      setShowLoginForm(false);
      setUploadMessage("");
    } else {
      setUploadMessage("Invalid credentials");
    }
  }
};

  const handleFileChange = (e) => {
    setHomeworkFile(e.target.files[0]);
  };

  const handleHomeworkUpload = (e) => {
  e.preventDefault();

  if (!selectedClass || !selectedSection || !selectedSubject || !selectedDate) {
    setUploadMessage("Please select all fields (Class, Section, Subject, Date)");
    return;
  }

  if (!homeworkFile && !homeworkText) {
    setUploadMessage("Please upload a file or enter homework text");
    return;
  }

  // 🔥 STORE IN FIREBASE
  push(ref(db, `homework/${session.schoolName}/${selectedClass}/${selectedSection}`), {
    class: selectedClass,
    section: selectedSection,
    subject: selectedSubject,
    date: selectedDate,
    text: homeworkText || "",
    fileName: homeworkFile ? homeworkFile.name : "",
    teacher: session.teacherName,
    createdAt: new Date().toISOString()
  });

  setUploadMessage("Homework uploaded successfully!");
  setHomeworkFile(null);
  setHomeworkText("");
};


  const handleLogoutClick = () => {
    setShowLoginForm(true);
    setSelectedSchool("");
    setSchoolEmail("");
    setPhoneNumber("");
    setPassword("");
    setSelectedClass("");
    setSelectedSection("");
    setSelectedSubject("");
    setSelectedDate("");
    setHomeworkFile(null);
    setHomeworkText("");
    setUploadMessage("");
    onLogout();
    setPage("role");
  };

  if (showLoginForm || !session) {
    return (
      <div className="container">
        <div className="page-logo-wrapper">
          <img src="/public/images/temp.png" alt="DigiDiary Logo" className="page-logo" />
        </div>
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

          <button type="submit" className="role-btn">Login</button>
          {uploadMessage && <p style={{ color: 'red', marginTop: '10px' }}>{uploadMessage}</p>}
        </form>
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
