import React, { useState } from 'react';
import RolePage from "./pages/RolePage";
import ParentHome from './pages/ParentHome';
import TeacherHome from './pages/TeacherHome';
import RegisterPage from './pages/RegisterPage';
import AddChildPage from './pages/AddChildPage';

const App = () => {
  const [page, setPage] = useState("role");
  const [teacherSession, setTeacherSession] = useState(() => {
    try {
      const saved = localStorage.getItem('teacherSession');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Error parsing teacherSession from localStorage:', error);
      localStorage.removeItem('teacherSession'); // Clear invalid data
      return null;
    }
  });
  const [parentSession, setParentSession] = useState(() => {
    try {
      const saved = localStorage.getItem('parentSession');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Error parsing parentSession from localStorage:', error);
      localStorage.removeItem('parentSession'); // Clear invalid data
      return null;
    }
  });

  const handleTeacherLogout = () => {
    setTeacherSession(null);
    localStorage.removeItem('teacherSession');
    setPage("role");
  };

  const handleParentLogout = () => {
    setParentSession(null);
    localStorage.removeItem('parentSession');
    setPage("role");
  };

  const handleTeacherLogin = (sessionData) => {
    setTeacherSession(sessionData);
    localStorage.setItem('teacherSession', JSON.stringify(sessionData));
  };

  const handleParentLogin = (sessionData) => {
    setParentSession(sessionData);
    localStorage.setItem('parentSession', JSON.stringify(sessionData));
  };

  if (page === "parent") {
    return (
      <>
        <div className="app-logo-wrapper">
          <img src="/images/temp.png" alt="DigiDiary Logo" className="app-logo" />
        </div>
        <ParentHome session={parentSession} onLogin={handleParentLogin} onLogout={handleParentLogout} setPage={setPage} />
      </>
    );
  }

  if (page === "teacher") {
    return (
      <>
        <div className="app-logo-wrapper">
          <img src="/images/temp.png" alt="DigiDiary Logo" className="app-logo" />
        </div>
        <TeacherHome session={teacherSession} onLogin={handleTeacherLogin} onLogout={handleTeacherLogout} setPage={setPage} />
      </>
    );
  }

  if (page === "teacherRegister") {
    return (
      <>
        <div className="app-logo-wrapper">
          <img src="/images/temp.png" alt="DigiDiary Logo" className="app-logo" />
        </div>
        <RegisterPage
          role="Teacher"
          onRegister={(sessionData) => {
            handleTeacherLogin(sessionData);
            setPage('teacher');
          }}
          onCancel={() => setPage('role')}
        />
      </>
    );
  }

  if (page === "parentRegister") {
    return (
      <>
        <div className="app-logo-wrapper">
          <img src="/images/temp.png" alt="DigiDiary Logo" className="app-logo" />
        </div>
        <RegisterPage
          role="Parent"
          onRegister={(sessionData) => {
            handleParentLogin(sessionData);
            setPage('parent');
          }}
          onCancel={() => setPage('role')}
        />
      </>
    );
  }

  if (page === "addChild") {
    return (
      <>
        <div className="app-logo-wrapper">
          <img src="/images/temp.png" alt="DigiDiary Logo" className="app-logo" />
        </div>
        <AddChildPage session={parentSession} onLogin={handleParentLogin} setPage={setPage} />
      </>
    );
  }

  return (
    <>
      <div className="app-header">
  <img src="/images/temp.png" alt="logo" className="app-logo" />
  <h2 className="app-title">DigiDiary</h2>
</div>
      <RolePage setPage={setPage} />
    </>
  );
}

export default App 
