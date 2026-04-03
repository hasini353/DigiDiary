import React, { useState } from 'react';
import '../App.css';

const AddChildPage = ({ session, onLogin, setPage }) => {
  const [childName, setChildName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [childClass, setChildClass] = useState('');
  const [childSection, setChildSection] = useState('');
  const [message, setMessage] = useState('');

  const schools = ["Sri Chaitanya School", "Lotus High School", "Delhi Public School"];
  const classes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const sections = ["A", "B", "C", "D"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!childName || !schoolName || !childClass || !childSection) {
      setMessage('Please fill all fields');
      return;
    }

    const newChild = `${childName} - Class ${childClass}${childSection} - ${schoolName}`;
    const updatedStudents = [...session.students, newChild];

    const updatedSession = {
      ...session,
      students: updatedStudents
    };

    onLogin(updatedSession);
    setMessage('Child added successfully!');
    setTimeout(() => {
      setPage('parent');
    }, 2000);
  };

  return (
    <div className="container">
      <h1 className="title">Add New Child</h1>
      <form onSubmit={handleSubmit} className="form-container" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div className="form-group">
          <label>Child Name:</label>
          <input
            type="text"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="form-input"
            placeholder="Enter child name"
            required
          />
        </div>

        <div className="form-group">
          <label>School Name:</label>
          <select
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            className="form-input"
            required
          >
            <option value="">-- Select School --</option>
            {schools.map((school) => (
              <option key={school} value={school}>
                {school}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Class:</label>
          <select
            value={childClass}
            onChange={(e) => setChildClass(e.target.value)}
            className="form-input"
            required
          >
            <option value="">-- Select Class --</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Section:</label>
          <select
            value={childSection}
            onChange={(e) => setChildSection(e.target.value)}
            className="form-input"
            required
          >
            <option value="">-- Select Section --</option>
            {sections.map((sec) => (
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))}
          </select>
        </div>

        {message && <p style={{ color: message.includes('successfully') ? 'green' : 'red', marginTop: '10px' }}>{message}</p>}

        <div className="button-container" style={{ textAlign: 'center' }}>
          <button type="submit" className="add-button" style={{ marginRight: '10px' }}>
            Add Child
          </button>
          <button type="button" className="add-button" onClick={() => setPage('parent')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddChildPage;