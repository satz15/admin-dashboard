import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/header.jsx';
import Sidebar from './components/sidebar.jsx';
import UserManagement from './components/usermanagment.jsx';
import RoleManagement from './components/rolemanagement.jsx';
import Login from './components/login.jsx';
// import PermissionManagement from './components/PermissionManagement';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check login state from localStorage on initial render
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    setIsAuthenticated(!!loggedInUser); // Convert to boolean
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="flex">
        {isAuthenticated && <Sidebar />}
        <div className="flex-grow">
          {isAuthenticated && <Header onLogout={handleLogout} />}
          <div className="p-4">
            <Routes>
              {!isAuthenticated ? (
                <Route path="*" element={<Login onLogin={handleLogin} />} />
              ) : (
                <>
                  <Route path="/dashboard" element={<UserManagement />} />
                  <Route path="/roles" element={<RoleManagement userRole="manager" />} />
                  {/* <Route path="/permissions" element={<PermissionManagement />} /> */}
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </>
              )}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
