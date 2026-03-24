
import React, { useState } from 'react';
import '../App.css';

const ParentHome = () => {
  const [search, setSearch] = useState("");

  const schools = [
    "Sri Chaitanya School",
    "Lotus High School",
    "Delhi Public School",
    "Greenwood High School",
    "Oakridge International School",
    "VIBGYOR High School"
  ];

  const filteredSchools = schools.filter((school) =>
    school.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="title">DigiDiary</h1>

      {/* Search Bar */   }
      <div className="search-container">
        <input
          type="text"
          placeholder="Search School..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Schools List */ }
      <h2 className="subtitle">Registered Schools</h2>

      {filteredSchools.length > 0 ? (
        filteredSchools.map((school, index) => (
          <div key={index} className="school-card">
            {school}
          </div>
        ))
      ) : (
        <p className="no-result">No school found</p>
      )}

      {/* Add School */ }
      <div className="button-container">
        <button className="add-button">Add New School</button>
      </div>
    </div>
  );
}

export default ParentHome; 