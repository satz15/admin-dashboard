import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authapi.js';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(credentials);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      onLogin(); 
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 to-gray-900">
      <div className="bg-slate-300 shadow-lg rounded-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Welcome Back
        </h2>
        {error && (
          <div className="text-red-500 text-sm text-center mb-4">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-all"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-sm text-center text-gray-500">
          Don't have an account?{' '}
          <button
            onClick={() => setShowModal(true)} 
            className="text-blue-500 hover:underline transition-all"
          >
            Login credentials
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4">Login Credentials</h3>
            <p className="mb-2">
              <strong>Admin Credential</strong>
              <br />
              Username: admin
              <br />
              Password: admin123
            </p>
            <p>
              <strong>Manager Credential</strong>
              <br />
              Username: manager
              <br />
              Password: manager123
            </p>
            <button
              onClick={() => setShowModal(false)} 
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
