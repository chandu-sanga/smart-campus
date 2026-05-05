import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import PortalSelection from './pages/PortalSelection';
import UserLogin from './pages/UserLogin';
import AdminLogin from './pages/AdminLogin';
import RegisterAuth from './pages/RegisterAuth';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-wrapper">
          <Navbar />
          <Routes>
            <Route path="/" element={<PortalSelection />} />
            <Route path="/user-login" element={<UserLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/register-auth" element={<RegisterAuth />} />
            
            <Route path="/user" element={
              <ProtectedRoute requiredRole="USER">
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/register/:id" element={
              <ProtectedRoute requiredRole="USER">
                <Register />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
