import React, { useState } from 'react';
import RolePage from "./pages/RolePage";
import ParentHome from './pages/ParentHome';
import SchoolDashboard from './pages/SchoolDashboard';

const App = () => {
  const [page,setPage]=useState("role");
  if(page==="parent") return <ParentHome/>;
  if(page==="school") return <SchoolDashboard/>;
  return (
    <div>
      <RolePage setPage={setPage}/>
    </div>
  )
}

export default App 
