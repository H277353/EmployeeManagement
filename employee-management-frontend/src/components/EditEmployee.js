import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditEmployee() {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8081/api/employees/${id}`)
      .then(response => {
        setName(response.data.name);
        setDepartment(response.data.department);
      })
      .catch(error => console.error('Error fetching employee:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !department) {
      setError('Both name and department are required!');
      return;
    }

    setError('');
    const updatedEmployee = { name, department };

    axios.put(`http://localhost:8081/api/employees/${id}`, updatedEmployee)
      .then(() => {
        navigate('/home');
      })
      .catch(error => {
        console.error('Error updating employee:', error);
        setError('Failed to update employee. Please try again.');
      });
  };

  const handleCancel = () => {
    navigate('/home');
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}

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

        <button type="submit" style={buttonStyles}>Update Employee</button>
        <button type="button" onClick={handleCancel} style={buttonStyles}>
          Cancel
        </button>
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
  margin: '5px',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#007BFF',
  color: 'white',
};

export default EditEmployee;
