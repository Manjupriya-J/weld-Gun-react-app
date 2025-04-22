import React, { useState, useEffect } from 'react';

const WeldGun = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve user data from sessionStorage
    const storedUserData = sessionStorage.getItem('userData');
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(parsedData);

      // Automatically save data to the server
      saveToServer(parsedData);
    }
  }, []);

  const saveToServer = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/saveWeldGunDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error('Failed to save data to server:', await response.json());
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Weld Gun</h1>

      {userData ? (
        <>
          <div className="bg-gray-100 p-6 shadow-md rounded mb-6">
            <h2 className="text-2xl font-semibold mb-4">User Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p><strong>Name:</strong> {userData['user name']}</p>
                <p><strong>User ID:</strong> {userData['user id']}</p>
                <p><strong>Shift No:</strong> {userData['shift no']}</p>
              </div>
              <div>
                <p><strong>Date:</strong> {userData['date']}</p>
                <p><strong>In Time:</strong> {userData['in time'] || 'N/A'}</p>
                <p><strong>Time Delay:</strong> {userData['time delay'] || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-6 shadow-md rounded mb-6">
            <h2 className="text-2xl font-semibold mb-4">Weld Gun Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p><strong>Program No:</strong> {userData['programme no']}</p>
                <p><strong>Cycle:</strong> {userData['cycle']}</p>
                <p><strong>Angle:</strong> {userData['angle']}</p>
                <p><strong>Weld Current:</strong> {userData['weld current']}</p>
              </div>
              <div>
                <p><strong>Spot Current:</strong> {userData['spot current']}</p>
                <p><strong>Force:</strong> {userData['force']}</p>
                <p><strong>Weld Count:</strong> {userData['weld count']}</p>
                <p><strong>Time:</strong> {userData['time']}</p>
                <p><strong>Job:</strong> {userData['job']}</p>
                <p><strong>Error:</strong> {userData['error'] || 'No error'}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No user data available. Please submit a user ID in the Admin page.</p>
      )}
    </div>
  );
};

export default WeldGun;
