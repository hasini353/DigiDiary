import React, { useState } from 'react';

const SchoolDashboard = () => {
  const [homework, setHomework] = useState("");

  return (
    <div className="container">
      <h2>School Dashboard</h2>

      <input
        type="text"
        placeholder="Enter Homework"
        value={homework}
        onChange={(e) => setHomework(e.target.value)}
      />

      <button>Post</button>
    </div>
  );
};

export default SchoolDashboard;
