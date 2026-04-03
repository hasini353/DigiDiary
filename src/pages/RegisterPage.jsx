import React, { useState } from 'react';
import '../App.css';
import { db } from '../firebase';
import { ref, set } from "firebase/database";

const RegisterPage = ({ role, onRegister, onCancel }) => {
  const [fullName, setFullName] = useState('');
  const [schoolEmail, setSchoolEmail] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isTeacher = role === 'Teacher';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName || !phoneNumber || !password || (isTeacher && (!schoolEmail || !schoolName))) {
      setError('Please fill all required fields.');
      return;
    }

    // 🔥 SAVE IN FIREBASE
    if (isTeacher) {
      set(ref(db, `teachers/${phoneNumber}`), {
        name: fullName,
        email: schoolEmail,
        phone: phoneNumber,
        school: schoolName,
        password: password
      });
    } else {
      set(ref(db, `parents/${phoneNumber}`), {
        name: fullName,
        email: schoolEmail,
        phone: phoneNumber,
        password: password,
        students: []
      });
    }

    const sessionData = {
      ...(isTeacher
        ? {
            schoolName,
            teacherName: fullName,
            teacherEmail: schoolEmail,
            teacherPhone: phoneNumber,
          }
        : {
            parentName: fullName,
            parentEmail: schoolEmail,
            parentPhone: phoneNumber,
            students: []
          }),
      password,
    };

    onRegister(sessionData);
    setError("Registered successfully!");
  };

  return (
    <div className="container" style={{ minHeight: '100vh', background: '#001f3f', color: '#fff', paddingTop: '20px' }}>
      <h1 className="title">{role} Register</h1>

      <form onSubmit={handleSubmit} className="form-container" style={{ maxWidth: '500px', margin: '0 auto' }}>
        
        <div className="form-group">
          <label>Full Name:</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="form-input" required />
        </div>

        <div className="form-group">
          <label>{isTeacher ? 'School Email:' : 'Email (optional):'}</label>
          <input type="email" value={schoolEmail} onChange={(e) => setSchoolEmail(e.target.value)} className="form-input" required={isTeacher} />
        </div>

        {isTeacher && (
          <div className="form-group">
            <label>School Name:</label>
            <input type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} className="form-input" required />
          </div>
        )}

        <div className="form-group">
          <label>Phone Number:</label>
          <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="form-input" required />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" required />
        </div>

        {error && <p style={{ color: error.includes("success") ? 'lightgreen' : 'red' }}>{error}</p>}

        <div style={{ textAlign: 'center' }}>
          <button type="submit" className="add-button">Register</button>
          <button type="button" className="add-button" onClick={onCancel}>Cancel</button>
        </div>

      </form>
    </div>
  );
};

export default RegisterPage;