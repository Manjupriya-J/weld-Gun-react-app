import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-5">
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      <ul>
        <li className="mb-4">
          <Link to="/" className="hover:text-gray-400">Dashboard</Link>
        </li>
        <li className="mb-4">
          <Link to="/weldguns" className="hover:text-gray-400">Weldguns</Link>
        </li>
        <li className="mb-4">
          <Link to="/errors" className="hover:text-gray-400">Errors</Link>
        </li>
        <li className="mb-4">
          <Link to="/admin" className="hover:text-gray-400">Admin</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
