import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onLogout }) => {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/users">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      </Link>     
      <button
        onClick={onLogout}
        className="bg-red-500 px-4 py-2 rounded text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
