import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EmployeeList.css';
import SearchBar from './SearchBar';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null); // Store employee to delete
  const navigate = useNavigate();

  // Fetch employees on component mount
  useEffect(() => {
    axios.get('http://localhost:8081/api/employees')
      .then(response => {
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      })
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  // Show confirmation modal
  const confirmDelete = (id) => {
    setShowModal(true);
    setEmployeeToDelete(id);
  };

  // Handle deletion
  const deleteEmployee = () => {
    if (employeeToDelete) {
      axios.delete(`http://localhost:8081/api/employees/${employeeToDelete}`)
        .then(() => {
          setEmployees(employees.filter(employee => employee.id !== employeeToDelete));
          setFilteredEmployees(filteredEmployees.filter(employee => employee.id !== employeeToDelete));
          setShowModal(false); // Close the modal
          setEmployeeToDelete(null); // Clear the stored employee
        })
        .catch(error => console.error('Error deleting employee:', error));
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setShowModal(false);
    setEmployeeToDelete(null);
  };

  // Handle search
  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      const result = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.id.toString().includes(searchTerm)
      );
      setFilteredEmployees(result);
    } else {
      setFilteredEmployees(employees);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token
    window.location.href = '/'; // Redirect to login
  };

  return (
    <div>
      <h2>Employee List</h2>

      {/* Logout Button */}
      <button style={logoutButtonStyle} onClick={handleLogout}>
        Logout
      </button>

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Add New Employee Button */}
      <button onClick={() => navigate('/add')}>Add New Employee</button>

      {/* Employee Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>
                <button
                  className="editButtonStyle"
                  onClick={() => navigate(`/edit/${employee.id}`)}
                >
                  Edit
                </button>
                <button onClick={() => confirmDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this employee?</p>
            <button onClick={deleteEmployee} style={confirmButtonStyle}>
              Yes, Delete
            </button>
            <button onClick={cancelDelete} style={cancelButtonStyle}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Styling
const logoutButtonStyle = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
  fontSize: '16px',
  borderRadius: '5px',
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
  width: '300px',
};

const confirmButtonStyle = {
  margin: '10px',
  padding: '10px 20px',
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const cancelButtonStyle = {
  margin: '10px',
  padding: '10px 20px',
  backgroundColor: 'gray',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default EmployeeList;
