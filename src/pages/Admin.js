import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [userId, setUserId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/searchUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId }),
      });

      if (response.ok) {
        const data = await response.json();
        setErrorMessage('');

        // Store userId and user data in sessionStorage for Errors and WeldGun pages
        sessionStorage.setItem('userData', JSON.stringify(data));
        sessionStorage.setItem('userId', userId);

        alert('User data fetched successfully. You can now navigate to the Weld Gun or Errors page manually.');
      } else {
        const errorData = await response.json();
        console.log(setErrorMessage(errorData.message || 'User not found'));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Error fetching data from server');
    }

    setUserId('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100 flex items-center justify-center py-12">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Panel</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700">Enter User ID</label>
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="User ID"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-md transition duration-200 hover:bg-blue-700 focus:outline-none"
          >
            Submit
          </button>
        </form>
        {errorMessage && <div className="mt-4 text-red-600 text-center">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Admin;
