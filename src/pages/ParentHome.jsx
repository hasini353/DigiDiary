import React, { useState, useEffect } from 'react';
import '../App.css';

const ParentHome = ({ session, onLogin, onLogout, setPage }) => {
  const [showLoginForm, setShowLoginForm] = useState(!session);
  const [parentPhone, setParentPhone] = useState("");
  const [password, setPassword] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedChild, setSelectedChild] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchSubject, setSearchSubject] = useState("");
  const [showAddChildForm, setShowAddChildForm] = useState(false);
  const [newChildName, setNewChildName] = useState("");
  const [newChildClass, setNewChildClass] = useState("");
  const [newChildSection, setNewChildSection] = useState("");
  const [newChildSchool, setNewChildSchool] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  // Sample homework data with more variety
  const homeworkData = [
    { id: 1, subject: "Mathematics", class: "8A", school: "Sri Chaitanya School", date: "2026-03-31", content: "Chapter 5: Revision Exercise + Practice Problems", teacher: "Mr. Sharma", due: "Tomorrow" },
    { id: 2, subject: "English", class: "8A", school: "Sri Chaitanya School", date: "2026-03-31", content: "Essay Writing: \"My Future Dreams\" (300-400 words)", teacher: "Ms. Priya", due: "3 days" },
    { id: 3, subject: "Science", class: "8A", school: "Sri Chaitanya School", date: "2026-03-31", content: "Project: Renewable Energy Sources", teacher: "Dr. Verma", due: "1 week" },
    { id: 4, subject: "Mathematics", class: "6C", school: "Sri Chaitanya School", date: "2026-03-31", content: "Basic Algebra: Solving Linear Equations", teacher: "Mr. Sharma", due: "2 days" },
    { id: 5, subject: "English", class: "6C", school: "Sri Chaitanya School", date: "2026-03-31", content: "Reading Comprehension: Chapter 3", teacher: "Ms. Priya", due: "Tomorrow" },
    { id: 6, subject: "Science", class: "6C", school: "Sri Chaitanya School", date: "2026-03-31", content: "Human Body Systems", teacher: "Dr. Verma", due: "4 days" },
    { id: 7, subject: "Mathematics", class: "7A", school: "Lotus High School", date: "2026-03-31", content: "Geometry: Properties of Triangles", teacher: "Dr. Patel", due: "Tomorrow" },
    { id: 8, subject: "English", class: "7A", school: "Lotus High School", date: "2026-03-31", content: "Grammar: Tenses and Voice", teacher: "Mrs. Rani", due: "2 days" },
    { id: 9, subject: "Science", class: "7A", school: "Lotus High School", date: "2026-03-31", content: "Chemical Reactions and Equations", teacher: "Dr. Patel", due: "3 days" },
    { id: 10, subject: "Mathematics", class: "5B", school: "Lotus High School", date: "2026-03-31", content: "Fractions and Decimals", teacher: "Dr. Patel", due: "Tomorrow" },
    { id: 11, subject: "English", class: "5B", school: "Lotus High School", date: "2026-03-31", content: "Vocabulary Building", teacher: "Mrs. Rani", due: "2 days" },
    { id: 12, subject: "Science", class: "5B", school: "Lotus High School", date: "2026-03-31", content: "Plants and Photosynthesis", teacher: "Dr. Patel", due: "4 days" },
    { id: 13, subject: "Mathematics", class: "8B", school: "Delhi Public School", date: "2026-03-31", content: "Linear Equations in Two Variables", teacher: "Mr. Kumar", due: "Tomorrow" },
    { id: 14, subject: "English", class: "8B", school: "Delhi Public School", date: "2026-03-31", content: "Literature: The Merchant of Venice", teacher: "Ms. Sharma", due: "3 days" },
    { id: 15, subject: "Science", class: "8B", school: "Delhi Public School", date: "2026-03-31", content: "Electricity and Magnetism", teacher: "Mr. Kumar", due: "1 week" },
    { id: 16, subject: "Mathematics", class: "6D", school: "Delhi Public School", date: "2026-03-31", content: "Ratio and Proportion", teacher: "Mr. Kumar", due: "2 days" },
    { id: 17, subject: "English", class: "6D", school: "Delhi Public School", date: "2026-03-31", content: "Creative Writing: Short Stories", teacher: "Ms. Sharma", due: "Tomorrow" },
    { id: 18, subject: "Science", class: "6D", school: "Delhi Public School", date: "2026-03-31", content: "Weather and Climate", teacher: "Mr. Kumar", due: "4 days" }
  ];

  // Sample parent data (removed school-specific login)
  const parentData = [
    { phone: "9876543210", password: "parent123", name: "Mr. Reddy", students: ["Rahul Reddy - Class 8A - Sri Chaitanya School", "Isha Reddy - Class 6C - Sri Chaitanya School"] },
    { phone: "9765432101", password: "parent123", name: "Mr. Patel", students: ["Ananya Patel - Class 7A - Lotus High School", "Dev Patel - Class 5B - Lotus High School"] },
    { phone: "9654321012", password: "parent123", name: "Mr. Verma", students: ["Manish Verma - Class 8B - Delhi Public School", "Priya Verma - Class 6D - Delhi Public School"] }
  ];

  const schools = ["Sri Chaitanya School", "Lotus High School", "Delhi Public School"];
  const classes = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];
  const sections = ["A", "B", "C", "D"];

  useEffect(() => {
    if (session) {
      setShowLoginForm(false);
    }
  }, [session]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!parentPhone || !password) {
      setLoginMessage("Please fill all fields");
      return;
    }

    const parent = parentData.find(p => p.phone === parentPhone && p.password === password);

    if (parent) {
      const sessionData = {
        parentName: parent.name,
        parentPhone: parentPhone,
        students: parent.students
      };
      onLogin(sessionData);
      setShowLoginForm(false);
      setLoginMessage("");
    } else {
      setLoginMessage("Invalid phone number or password");
    }
  };

  const handleLogoutClick = () => {
    setShowLoginForm(true);
    setParentPhone("");
    setPassword("");
    setSelectedSchool("");
    setSelectedChild("");
    setSearchDate("");
    setSearchSubject("");
    setShowAddChildForm(false);
    setNewChildName("");
    setNewChildClass("");
    setNewChildSection("");
    setNewChildSchool("");
    setLoginMessage("");
    onLogout();
    setPage("role");
  };

  // Filter homework based on selected child, date, and subject
  const getFilteredHomework = () => {
    if (!selectedChild) return [];

    // Parse child info: "Name - Class - School"
    const childParts = selectedChild.split(" - ");
    const childClass = childParts[1];
    const childSchool = childParts[2];

    let filtered = homeworkData.filter(hw => hw.class === childClass && hw.school === childSchool);

    if (searchDate) {
      filtered = filtered.filter(hw => hw.date === searchDate);
    }

    if (searchSubject) {
      filtered = filtered.filter(hw => hw.subject.toLowerCase() === searchSubject.toLowerCase());
    }

    return filtered;
  };

  const handleAddChild = () => {
    if (!newChildName || !newChildClass || !newChildSection || !newChildSchool) {
      setLoginMessage("Please fill all child details");
      return;
    }

    const newChild = `${newChildName} - ${newChildClass}${newChildSection} - ${newChildSchool}`;
    const updatedStudents = [...session.students, newChild];

    // Update session with new child
    const updatedSession = {
      ...session,
      students: updatedStudents
    };

    onLogin(updatedSession);

    // Reset form
    setNewChildName("");
    setNewChildClass("");
    setNewChildSection("");
    setNewChildSchool("");
    setShowAddChildForm(false);
    setLoginMessage("Child added successfully!");
    setTimeout(() => setLoginMessage(""), 3000);
  };

  if (showLoginForm || !session) {
    return (
      <div className="container">
        <h1 className="title">Parent Login</h1>
        <form onSubmit={handleLoginSubmit} className="form-container">
          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="tel"
              placeholder="Enter your registered phone number"
              value={parentPhone}
              onChange={(e) => setParentPhone(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="role-btn">Login</button>
          {loginMessage && <p style={{ color: 'red', marginTop: '10px' }}>{loginMessage}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header" style={{ backgroundColor: '#fafbfc', border: '1px solid #e8ebee', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
        <div>
          <h1 className="title" style={{ marginBottom: '8px' , color: 'black'}}>DigiDiary</h1>
          <p style={{ fontSize: '14px', color: '#444' }}>
            Parent: <strong>{session.parentName}</strong> | Contact: <strong>{session.parentPhone}</strong>
          </p>
        </div>
        <button onClick={handleLogoutClick} className="role-btn" style={{ padding: '8px 16px', fontSize: '14px', height: 'fit-content' }}>Logout</button>
      </div>

      {/* School Selection */}
      <div style={{ marginBottom: '24px' }}>
        <div className="form-group" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <label>Select School:</label>
          <select
            value={selectedSchool}
            onChange={(e) => {
              setSelectedSchool(e.target.value);
              setSelectedChild("");
            }}
            className="form-input"
          >
            <option value="">-- Select School --</option>
            {schools.map((school) => (
              <option key={school} value={school}>
                {school}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Child Selection */}
      {selectedSchool && (
        <div style={{ marginBottom: '24px' }}>
          <div className="form-group" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <label>Select Child:</label>
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="form-input"
            >
              <option value="">-- Select Your Child --</option>
              {session.students && session.students
                .filter(student => student.includes(selectedSchool))
                .map((student, index) => (
                  <option key={index} value={student}>
                    {student}
                  </option>
                ))}
            </select>
          </div>
        </div>
      )}

      {/* Search Filters */}
      {selectedChild && (
        <div style={{ marginBottom: '24px' }}>
          <div className="form-group" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <label>Search Homework:</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="form-input"
                placeholder="Select date"
              />
              <select
                value={searchSubject}
                onChange={(e) => setSearchSubject(e.target.value)}
                className="form-input"
              >
                <option value="">All Subjects</option>
                <option value="mathematics">Mathematics</option>
                <option value="english">English</option>
                <option value="science">Science</option>
                <option value="social studies">Social Studies</option>
                <option value="hindi">Hindi</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Homework Display */}
      {selectedChild && (
        <div style={{ marginTop: '32px' }}>
          <h2 className="subtitle" style={{ textAlign: 'center', marginBottom: '24px', fontSize: '20px', color: '#007bff' }}>📚 Homework for {selectedChild}</h2>
          {getFilteredHomework().length > 0 ? (
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              {getFilteredHomework().map((hw) => (
                <div key={hw.id} className="school-card" style={{ marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <strong style={{ fontSize: '16px', color: '#007bff' }}>{hw.subject}</strong>
                    <span style={{ backgroundColor: '#e8f4f8', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', color: '#0056b3' }}>{hw.subject}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#333', marginBottom: '10px', lineHeight: '1.6' }}>{hw.content}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px', color: '#666', borderTop: '1px solid #e8ebee', paddingTop: '12px' }}>
                    <div><strong>Teachers:</strong> {hw.teacher}</div>
                    <div><strong>Due Date:</strong> {hw.due}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999', backgroundColor: '#f8f9fa', borderRadius: '8px', marginTop: '20px' }}>
              <p style={{ fontSize: '16px', marginBottom: '10px' }}>📭 No homework found</p>
              <p style={{ fontSize: '13px' }}>Try selecting a different date or subject</p>
            </div>
          )}
        </div>
      )}

      {/* Add Child Form */}
      {showAddChildForm && (
        <div style={{ marginBottom: '24px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef' }}>
          <h3 style={{ marginBottom: '16px', color: '#333' }}>Add New Child</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
            <div className="form-group">
              <label>Child Name:</label>
              <input
                type="text"
                placeholder="Enter name"
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Class:</label>
              <select
                value={newChildClass}
                onChange={(e) => setNewChildClass(e.target.value)}
                className="form-input"
              >
                <option value="">Select Class</option>
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
                value={newChildSection}
                onChange={(e) => setNewChildSection(e.target.value)}
                className="form-input"
              >
                <option value="">Select Section</option>
                {sections.map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>School:</label>
              <select
                value={newChildSchool}
                onChange={(e) => setNewChildSchool(e.target.value)}
                className="form-input"
              >
                <option value="">Select School</option>
                {schools.map((school) => (
                  <option key={school} value={school}>
                    {school}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button onClick={handleAddChild} className="role-btn" style={{ marginRight: '10px' }}>Add Child</button>
            <button onClick={() => setShowAddChildForm(false)} style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Add Child Button */}
      <div className="button-container">
        <button onClick={() => setShowAddChildForm(true)} className="role-btn" style={{ backgroundColor: '#007bff', border: 'none', padding: '12px 24px' }}>Add Another Child</button>
      </div>

      {loginMessage && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: loginMessage.includes('successfully') ? '#d4edda' : '#f8d7da',
          color: loginMessage.includes('successfully') ? '#155724' : '#721c24',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          {loginMessage}
        </div>
      )}
    </div>
  );
};

export default ParentHome; 