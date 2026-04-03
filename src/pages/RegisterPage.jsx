import React, { useState } from 'react';
import '../App.css';

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
      setError('Please fill all required fields in the registration form.');
      return;
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
          }),
      password,
    };

    onRegister(sessionData);
  };

  return (
    <div className="container" style={{ minHeight: '100vh', background: '#001f3f', color: '#fff', paddingTop: '20px' }}>
      <h1 className="title">{role} Register</h1>
      <form onSubmit={handleSubmit} className="form-container" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div className="form-group">
          <label>Full Name:</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="form-input" placeholder="Enter your full name" required />
        </div>

        <div className="form-group">
          <label>{isTeacher ? 'School Email:' : 'Email (optional):'}</label>
          <input
            type="email"
            value={schoolEmail}
            onChange={(e) => setSchoolEmail(e.target.value)}
            className="form-input"
            placeholder={isTeacher ? 'Enter your school email' : 'Enter your email (optional)'}
            required={isTeacher}
          />
        </div>

        {isTeacher && (
          <div className="form-group">
            <label>School Name:</label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="form-input"
              placeholder="Enter your school name"
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>Phone Number:</label>
          <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="form-input" placeholder="Enter your phone number" required />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" placeholder="Enter a password" required />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="button-container" style={{ textAlign: 'center' }}>
          <button type="submit" className="add-button" style={{ marginRight: '10px' }}>
            Register
          </button>
          <button type="button" className="add-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
