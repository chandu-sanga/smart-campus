import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(async res => {
      if (res.ok) {
        const data = await res.json();
        if (data.role !== 'USER') {
          setError('Please use the Admin Portal for administrator access.');
          return;
        }
        login(data);
        navigate('/user');
      } else {
        const errText = await res.text();
        setError(errText || 'Invalid credentials');
      }
    })
    .catch(() => setError('Error connecting to server'));
  };

  return (
    <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh'}}>
      <div className="form-container" style={{width: '100%', maxWidth: '400px', padding: '30px', borderTop: '5px solid #003366'}}>
        <h2 style={{textAlign: 'center', marginBottom: '20px', color: '#003366'}}>Student Login</h2>
        {error && <div style={{color: 'white', background: '#dc3545', padding: '10px', borderRadius: '4px', marginBottom: '15px'}}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{marginBottom: '15px'}}>
            <label className="form-label">Username / Student ID</label>
            <input type="text" className="form-control" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} required />
          </div>
          <div className="form-group" style={{marginBottom: '20px'}}>
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Log In</button>
        </form>
        <p style={{textAlign: 'center', marginTop: '15px', fontSize: '0.9rem'}}>
          Don't have an account? <Link to="/register-auth" style={{color: '#D4AF37'}}>Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
