import React from 'react';
import '../App.css';
import './RolePage.css';

const RolePage = ({ setPage }) => {

  const teacherImg = '/images/teach.jpeg';
  const parentImg = '/images/parent.jpg';

  return (
    <div className="role-page">

      <div className="title-container">
        <h1 className="role-title">DigiDiary</h1>
      </div>

      <h2 className="role-subtitle">Select Login Type</h2>

      <div className="role-actions">

        {/* Teacher */}
        <div className="role-card">
          <img src={teacherImg} alt="Teacher" className="role-img" />

          <h3 className="role-card-title">Teacher</h3>

          <button
            onClick={() => setPage('teacher')}
            className="role-btn"
          >
            Login
          </button>

          <button
            onClick={() => setPage('teacherRegister')}
            className="role-btn role-register-btn"
          >
            Register
          </button>
        </div>

        {/* Parent */}
        <div className="role-card">
          <img src={parentImg} alt="Parent" className="role-img" />

          <h3 className="role-card-title">Parent</h3>

          <button
            onClick={() => setPage('parent')}
            className="role-btn"
          >
            Login
          </button>

          <button
            onClick={() => setPage('parentRegister')}
            className="role-btn role-register-btn"
          >
            Register
          </button>
        </div>

      </div>
    </div>
  );
};

export default RolePage;
