import React, { useState, useEffect } from 'react';

const Errors = () => {
  const [userData, setUserData] = useState(null);
  const [errors, setErrors] = useState([]);
  const [filteredErrors, setFilteredErrors] = useState([]);

  // Function to calculate In Time and Out Time
  const calculateTimes = (date) => {
    const inTime = new Date(date);
    const outTime = new Date(inTime);
    outTime.setHours(inTime.getHours() + 1);

    const formatTime = (time) => {
      const hours = time.getHours().toString().padStart(2, '0');
      const minutes = time.getMinutes().toString().padStart(2, '0');
      const seconds = time.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    };

    return {
      inTime: formatTime(inTime),
      outTime: formatTime(outTime),
    };
  };

  useEffect(() => {
    // Retrieve user data (e.g., admin passed ID)
    const storedUserData = sessionStorage.getItem('userData');

    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      setUserData(user);

      const fetchErrors = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/errors', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user.id }),
          });
      
          if (response.ok) {
            const data = await response.json();
      
            // Add calculated times to the filtered errors
            const errorsWithTimes = data.map((error) => {
              const { inTime, outTime } = calculateTimes(error.date);
              return { ...error, inTime, outTime };
            });
      
            setFilteredErrors(errorsWithTimes);
            setErrors(data); // Ensure this part is in the correct place
          } else {
            console.error('No errors found:', await response.json());
          }
        } catch (error) {
          console.error('Error fetching errors:', error);
        }
      };

      fetchErrors();
    }
  }, []);

  const saveToFile = (data) => {
    const textContent = data
      .map(
        (error) =>
          `Date: ${error.date}\nWeldGun: ${error.weldGun}\nEmployee Name: ${error.employeeName}\nError: ${error.errorMessage}\nError Code: ${error.errorCode}\nIn Time: ${error.inTime}\nOut Time: ${error.outTime}\n`
      )
      .join('\n---\n');

    const blob = new Blob([textContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'filtered_errors.txt';
    link.click();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Errors</h1>
      {userData ? (
        <>
          <p>Details for Employee ID: {userData.id}</p>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-300 bg-gray-100 text-left">Date</th>
                <th className="px-4 py-2 border border-gray-300 bg-gray-100 text-left">WeldGun</th>
                <th className="px-4 py-2 border border-gray-300 bg-gray-100 text-left">Employee Name</th>
                <th className="px-4 py-2 border border-gray-300 bg-gray-100 text-left">Error</th>
                <th className="px-4 py-2 border border-gray-300 bg-gray-100 text-left">Error Code</th>
                <th className="px-4 py-2 border border-gray-300 bg-gray-100 text-left">In Time</th>
                <th className="px-4 py-2 border border-gray-300 bg-gray-100 text-left">Out Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredErrors.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-2 border border-gray-300 text-center">
                    No errors found for this Employee ID.
                  </td>
                </tr>
              ) : (
                filteredErrors.map((error, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border border-gray-300">{error.date}</td>
                    <td className="px-4 py-2 border border-gray-300">{error.weldGun}</td>
                    <td className="px-4 py-2 border border-gray-300">{error.employeeName}</td>
                    <td className="px-4 py-2 border border-gray-300">{error.errorMessage}</td>
                    <td className="px-4 py-2 border border-gray-300">{error.errorCode}</td>
                    <td className="px-4 py-2 border border-gray-300">{error.inTime}</td>
                    <td className="px-4 py-2 border border-gray-300">{error.outTime}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      ) : (
        <p>No user data available. Please submit a valid Employee ID.</p>
      )}
    </div>
  );
};

export default Errors;
