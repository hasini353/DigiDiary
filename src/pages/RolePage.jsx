import React from 'react'
import '../App.css'
import './RolePage.css'

const RolePage = ({ setPage }) => {
  // Files placed in public/images are served from '/images/...'
  const teacherImg = '/public/images/teach.jpeg'
  const parentImg = '/public/images/parent.jpg'

  return (
    <div className="role-page">
      <br/> <br/>
      <h1 className="role-title">DigiDiary</h1> <br/><br/>

      <h2 className="role-subtitle">Select Login Type</h2>
<br/>
      <div className="role-actions">
        {/* Teacher */}
        <div className="role-card">
          <img src={teacherImg} alt="Teacher" className="role-img" />
          <button onClick={() => setPage && setPage('teacher')} className="role-btn">
            Teacher Login
          </button>
        </div>

        {/* Parent */}
        <div className="role-card">
          <img src={parentImg} alt="Parent" className="role-img" />
          <button onClick={() => setPage && setPage('parent')} className="role-btn">
            Parent Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default RolePage
