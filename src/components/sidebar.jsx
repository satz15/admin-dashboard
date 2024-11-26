import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="bg-gray-800 text-white h-screen w-60 p-4 flex items-">
    <nav className='mt-10'>
      <ul className='flex flex-col gap-2'>
        <li className="my-2"><Link to="/users" className="hover:underline text-xl">User Management</Link></li>
        
        <li className="my-2"><Link to="/roles" className="hover:underline text-xl">Role Management</Link></li>
        {/* <li className="my-2"><Link to="/permissions" className="hover:underline">Permission Management</Link></li> */}
      </ul>
    </nav>
  </div>
);

export default Sidebar;
