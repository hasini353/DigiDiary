import React, { useState, useEffect } from 'react';
import RolePage from "./pages/RolePage";
import ParentHome from './pages/ParentHome';
import TeacherHome from './pages/TeacherHome';
import RegisterPage from './pages/RegisterPage';
import AddChildPage from './pages/AddChildPage';

const App = () => {
  const [page, setPage] = useState("role");
  const [teacherSession, setTeacherSession] = useState(null);
  const [parentSession, setParentSession] = useState(null);

  // Load sessions from localStorage on mount
  useEffect(() => {
    const savedTeacherSession = localStorage.getItem('teacherSession');
    const savedParentSession = localStorage.getItem('parentSession');
    
    if (savedTeacherSession) {
      setTeacherSession(JSON.parse(savedTeacherSession));
    }
    if (savedParentSession) {
      setParentSession(JSON.parse(savedParentSession));
    }
  }, []);

  const handleGoToTeacher = () => {
    setPage("teacher");
  };

  const handleGoToParent = () => {
    setPage("parent");
  };

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
