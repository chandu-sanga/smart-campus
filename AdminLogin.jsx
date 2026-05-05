import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
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
        if (data.role !== 'ADMIN') {
          setError('Access denied. This portal is for Administrators only.');
          return;
        }
        login(data);
        navigate('/admin');
      } else {
        const errText = await res.text();
        setError(errText || 'Invalid credentials');
      }
    })
    .catch(() => setError('Error connecting to server'));
  };

  return (
    <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh'}}>
      <div className="form-container" style={{width: '100%', maxWidth: '400px', padding: '30px', borderTop: '5px solid #E63946'}}>
        <h2 style={{textAlign: 'center', marginBottom: '20px', color: '#E63946'}}>Admin Login</h2>
        {error && <div style={{color: 'white', background: '#dc3545', padding: '10px', borderRadius: '4px', marginBottom: '15px'}}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{marginBottom: '15px'}}>
            <label className="form-label">Admin Username</label>
            <input type="text" className="form-control" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} required />
          </div>
          <div className="form-group" style={{marginBottom: '20px'}}>
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
          </div>
          <button type="submit" className="btn" style={{width: '100%', backgroundColor: '#E63946', color: 'white'}}>Access Dashboard</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
