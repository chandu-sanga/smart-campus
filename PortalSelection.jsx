import { Link } from 'react-router-dom';
import { Users, Shield } from 'lucide-react';

const PortalSelection = () => {
  return (
    <div className="container" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 className="section-title" style={{ marginBottom: '50px' }}>Select Your Portal</h1>
      
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/user-login" style={{ background: 'white', padding: '40px', borderRadius: '12px', textAlign: 'center', width: '300px', textDecoration: 'none', color: 'inherit', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', transition: 'transform 0.3s' }} className="portal-card">
          <Users size={64} color="#003366" style={{ marginBottom: '20px' }} />
          <h2 style={{ marginBottom: '10px' }}>User Portal</h2>
          <p style={{ color: '#666' }}>Browse upcoming campus events and register to participate.</p>
        </Link>

        <Link to="/admin-login" style={{ background: 'white', padding: '40px', borderRadius: '12px', textAlign: 'center', width: '300px', textDecoration: 'none', color: 'inherit', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', transition: 'transform 0.3s' }} className="portal-card">
          <Shield size={64} color="#E63946" style={{ marginBottom: '20px' }} />
          <h2 style={{ marginBottom: '10px' }}>Admin Portal</h2>
          <p style={{ color: '#666' }}>Manage university events, track registrations, and oversee operations.</p>
        </Link>
      </div>
      
      <style>{`
        .portal-card:hover { transform: translateY(-10px); border: 2px solid #D4AF37; }
        .portal-card { border: 2px solid transparent; }
      `}</style>
    </div>
  );
};

export default PortalSelection;
