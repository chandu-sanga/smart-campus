import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Register = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    department: '',
    phoneNumber: '',
    vtuId: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const registrationData = {
      ...formData,
      eventId: parseInt(id)
    };

    fetch('/api/registrations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registrationData)
    })
    .then(res => {
      if(res.ok) {
        alert(`Successfully registered for event!`);
        navigate('/');
      } else {
        alert('Failed to register. Please try again.');
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error connecting to the server.');
    });
  };

  return (
    <div className="container" style={{padding: '40px 20px'}}>
      <h2 className="section-title" style={{marginBottom: '10px'}}>Event Registration</h2>
      <p style={{textAlign: 'center', marginBottom: '30px', color: '#666'}}>
        Complete the form below to secure your spot for Event
      </p>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-control" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="e.g. John Doe"
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Age</label>
            <input 
              type="number" 
              className="form-control" 
              name="age" 
              value={formData.age} 
              onChange={handleChange} 
              placeholder="e.g. 20"
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Veltech Student ID (VTU No.)</label>
            <input 
              type="text" 
              className="form-control" 
              name="vtuId" 
              value={formData.vtuId} 
              onChange={handleChange} 
              placeholder="e.g. VTU12345"
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input 
              type="tel" 
              className="form-control" 
              name="phoneNumber" 
              value={formData.phoneNumber} 
              onChange={handleChange} 
              placeholder="e.g. 9876543210"
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Department</label>
            <select 
              className="form-control" 
              name="department" 
              value={formData.department} 
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="CSE">Computer Science and Engineering</option>
              <option value="ECE">Electronics and Communication</option>
              <option value="MECH">Mechanical Engineering</option>
              <option value="CIVIL">Civil Engineering</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{width: '100%', marginTop: '10px'}}>
            Confirm Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
