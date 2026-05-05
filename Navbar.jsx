import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header>
      <div className="container header-container">
        <Link to="/" className="logo-section">
          <GraduationCap size={32} color="#D4AF37" />
          <div className="logo-text">Veltech<span className="logo-accent">Events</span></div>
        </Link>
        <nav className="nav-links" style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
          <Link to="/">Portals</Link>
          {user ? (
            <>
              {user.role === 'ADMIN' && <Link to="/admin">Admin View</Link>}
              {user.role === 'USER' && <Link to="/user">User View</Link>}
              <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '20px', paddingLeft: '20px', borderLeft: '1px solid rgba(255,255,255,0.2)'}}>
                <span style={{color: '#D4AF37', fontSize: '0.9rem'}}>Hi, {user.username}</span>
                <button onClick={handleLogout} className="btn" style={{padding: '5px 10px', display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: 'transparent', border: '1px solid white'}}>
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/user-login" className="btn" style={{padding: '5px 15px', backgroundColor: 'transparent', border: '1px solid white'}}>Log In</Link>
              <Link to="/register-auth" className="btn btn-primary" style={{padding: '5px 15px'}}>Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
