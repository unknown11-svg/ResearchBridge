import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from "../api/index.js";
import "../styles/signup.css"

const SignupPage = () => {
  const [formData, setFormData] = useState({
    role: 'Researcher',
    fname: '',
    lname: '',
    email: '',
    password: '',
    contact: '',  // <- renamed from contactNo
    department: '',
    academicrole: 'Student',  // <- renamed from academicRole
    researcharea: '',  // <- renamed from researchArea
    researchExperience: 'Bachelor',
  });
  

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const response = await API.USER.signup(formData);
      const { token, userId, role } = response.data;

      const queryParams = new URLSearchParams({
        token,
        userId,
        role,
      }).toString();

      console.log("Form data being submitted:", formData);
      navigate(`/login?${queryParams}`);
    } catch (error) {
      console.error("Signup error:", error);
      const errRes = error.response?.data;

      if (errRes?.code === 'INVALID_EMAIL_DOMAIN') {
        setErrors({ code: 'INVALID_EMAIL_DOMAIN' });
      } else {
        setErrors({ general: errRes?.message || "Registration failed." });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderRoleFields = () => {
    switch (formData.role) {
      case 'Researcher':
        return (
          <>
            <div className="form-group">
              <label>Research Area</label>
              <input
                type="text"
                name="researcharea"
                value={formData.researcharea}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Research Experience</label>
              <select
                name="researchExperience"
                value={formData.researchExperience}
                onChange={handleChange}
                required
              >
                <option value="Bachelor">Bachelor</option>
                <option value="Honours">Honours</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
          </>
        );
      case 'Reviewer':
        return (
          <div className="form-group">
            <label>Research Experience</label>
            <select
              name="researchExperience"
              value={formData.researchExperience}
              onChange={handleChange}
              required
            >
              <option value="Bachelor">Bachelor</option>
              <option value="Honours">Honours</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="signup-container">
      <h1>Research Bridge Signup</h1>
      <form onSubmit={handleSubmit}>
        {errors.general && <div className="error">{errors.general}</div>}

        <div className="form-group">
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="Researcher">Researcher</option>
            <option value="Admin">Admin</option>
            <option value="Reviewer">Reviewer</option>
          </select>
        </div>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Surname</label>
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Wits Student Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="user@students.wits.ac.za"
          />
          {errors.code === 'INVALID_EMAIL_DOMAIN' && (
            <div className="error">Only Wits student emails allowed</div>
          )}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="8"
          />
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Academic Role</label>
          <select
            name="academicrole"
            value={formData.academicrole}
            onChange={handleChange}
            required
          >
            <option value="Student">Student</option>
            <option value="Lecturer">Lecturer</option>
            <option value="Academic Researcher">Academic Researcher</option>
          </select>
        </div>

        {renderRoleFields()}

        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
