import React from 'react'
import '../App.css'
import './RolePage.css'

const RolePage = ({ setPage }) => {
  // Files placed in public/images are served from '/images/...'
  const teacherImg = '/public/images/teach.jpeg'
  const parentImg = '/public/images/parent.jpg'
  const logoImg = '/public/images/temp.png' // Using temp.png as logo placeholder

  return (
    <div className="role-page">
      <div className="title-container"><br/>
        
        <h1 className="role-title">DigiDiary</h1>
      </div><br/><br/>

      <h2 className="role-subtitle">Select Login Type</h2>

      <div className="role-actions">
        {/* Teacher */}
        <div className="role-card">
          <img src={teacherImg} alt="Teacher" className="role-img" />
          <h3 className="role-card-title">Teacher</h3>
          <button onClick={() => setPage && setPage('teacher')} className="role-btn">
            Login
          </button>
          <button onClick={() => setPage && setPage('teacherRegister')} className="role-btn role-register-btn">
            Register
          </button>
        </div>

        {/* Parent */}
        <div className="role-card">
          <img src={parentImg} alt="Parent" className="role-img" />
          <h3 className="role-card-title">Parent</h3>
          <button onClick={() => setPage && setPage('parent')} className="role-btn">
            Login
          </button>
          <button onClick={() => setPage && setPage('parentRegister')} className="role-btn role-register-btn">
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default RolePage
