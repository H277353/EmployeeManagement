// src/components/AddEmployee.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !department) {
      setError('Both name and department are required!');
      return;
    }

    setError(''); // Clear any previous errors

    const newEmployee = { name, department };

    axios.post('http://localhost:8081/api/employees', newEmployee)
      .then(() => {
        navigate('/home');
      })
      .catch((error) => {
        console.error('Error adding employee:', error);
        setError('Failed to add employee. Please try again.');
      });
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyles}
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={inputStyles}
        >
          <option value="">Select Department</option>
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
        </select>

        <button type="submit" style={buttonStyles}>Add Employee</button>
      </form>
    </div>
  );
}

// Shared styles for inputs and dropdown
const inputStyles = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  fontSize: '16px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

// Shared styles for buttons
const buttonStyles = {
  padding: '10px 15px',
  marginTop: '10px',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#007BFF',
  color: 'white',
};

export default AddEmployee;
