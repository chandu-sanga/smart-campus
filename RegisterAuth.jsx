import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RegisterAuth = () => {
  const [formData, setFormData] = useState({ username: '', password: '', role: 'USER' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(async res => {
      if (res.ok) {
        alert('Registration successful! Please log in.');
        navigate('/login');
      } else {
        const errText = await res.text();
        setError(errText || 'Registration failed');
      }
    })
    .catch(() => setError('Error connecting to server'));
  };

  return (
    <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh'}}>
      <div className="form-container" style={{width: '100%', maxWidth: '400px', padding: '30px'}}>
        <h2 style={{textAlign: 'center', marginBottom: '20px', color: '#003366'}}>Sign Up</h2>
        {error && <div style={{color: 'white', background: '#dc3545', padding: '10px', borderRadius: '4px', marginBottom: '15px'}}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{marginBottom: '15px'}}>
            <label className="form-label">Username</label>
            <input type="text" className="form-control" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} required />
          </div>
          <div className="form-group" style={{marginBottom: '15px'}}>
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
          </div>
          <div className="form-group" style={{marginBottom: '20px'}}>
            <label className="form-label">Account Type</label>
            <select className="form-control" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} required>
              <option value="USER">Student / User</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Register Account</button>
        </form>
        <p style={{textAlign: 'center', marginTop: '15px', fontSize: '0.9rem'}}>
          Already have an account? <Link to="/login" style={{color: '#D4AF37'}}>Log in here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterAuth;
