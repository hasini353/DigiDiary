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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !phoneNumber || !password || (isTeacher && (!schoolEmail || !schoolName))) {
      setError('Please fill all required fields.');
      return;
    }

    try {
      // ✅ Choose API based on role
      const url = isTeacher
        ? "http://localhost:5000/register-teacher"
        : "http://localhost:5000/register-parent";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: fullName,
          email: schoolEmail,
          phone: phoneNumber,
          school: schoolName, // only for teacher
          password: password
        })
      });

      const data = await res.json();

      if (data.success) {

        const sessionData = isTeacher
          ? {
              schoolName,
              teacherName: fullName,
              teacherEmail: schoolEmail,
              teacherPhone: phoneNumber
            }
          : {
              parentName: fullName,
              parentEmail: schoolEmail,
              parentPhone: phoneNumber,
              students: []
            };

        onRegister(sessionData);

        setError("Registered successfully!");

      } else {
        setError(data.message || "Registration failed");
      }

    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="container auth-page">
      <div className="auth-card">
        <h1 className="title">{role} Register</h1>

        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label>{isTeacher ? 'School Email:' : 'Email (optional):'}</label>
          <input
            type="email"
            value={schoolEmail}
            onChange={(e) => setSchoolEmail(e.target.value)}
            className="form-input"
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
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="tel"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
        </div>

        {error && (
          <p style={{
            color: error.includes("success") ? 'lightgreen' : 'red',
            textAlign: 'center'
          }}>
            {error}
          </p>
        )}

        <div className="auth-actions">
          <button type="submit" className="add-button">Register</button>
          <button type="button" className="add-button" onClick={onCancel}>Cancel</button>
        </div>

      </form>
      </div>
    </div>
  );
};

export default RegisterPage;
