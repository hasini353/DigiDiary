import React, { useState, useEffect } from 'react';
import RolePage from "./pages/RolePage";
import ParentHome from './pages/ParentHome';
import TeacherHome from './pages/TeacherHome';

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
    return <ParentHome session={parentSession} onLogin={handleParentLogin} onLogout={handleParentLogout} setPage={setPage} />;
  }
  if (page === "teacher") {
    return <TeacherHome session={teacherSession} onLogin={handleTeacherLogin} onLogout={handleTeacherLogout} setPage={setPage} />;
  }
  return (
    <div>
      <RolePage setPage={setPage} />
    </div>
  )
}

export default App 
