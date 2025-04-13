import React, { useState } from 'react';
import './RolePicker.css'; 

const RolePicker = () => {
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
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
