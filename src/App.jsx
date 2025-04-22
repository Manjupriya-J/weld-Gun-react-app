import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Import Routes instead of Switch
import Sidebar from './pages/Sidebar';
import MainContent from './pages/MainContent';
import WeldGun from './pages/Weldguns';
import Errors from './pages/Errors';
import Admin from './pages/Admin';

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-10">
          <Routes>  {/* Use Routes instead of Switch */}
            <Route path="/" element={<MainContent />} />  {/* Use element prop */}
            <Route path="/weldguns" element={<WeldGun />} />
            <Route path="/errors" element={<Errors />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
