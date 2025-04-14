import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/rolepicker.css'; 

const RolePicker = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    const role = event.target.value;
    setSelectedRole(role);

    // Redirect based on selected role
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'researcher') {
      navigate('/researcher');
    } else if (role === 'reviewer') {
      navigate('/reviewer');
    }
  };

  return (
    <section className="role-picker">
      <h2>Choose Your Role</h2>
      
      <select value={selectedRole} onChange={handleRoleChange} className="role-select">
        <option value="">--Select a Role--</option>
        <option value="admin">Admin</option>
        <option value="researcher">Researcher</option>
        <option value="reviewer">Reviewer</option>
      </select>

      {selectedRole && <p>You selected: {selectedRole}</p>}
    </section>
  );
};

export default RolePicker;
