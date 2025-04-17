import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import UserDetailsForm from './components/UserDetailsForm';
import UserDetailsDisplay from './components/UserDetailsDisplay';

function App() {
  const [userDetails, setUserDetails] = useState<{ name: string; mobile: string; desc: string; company: string; address: string; role: string } | null>(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user-details" element={<UserDetailsForm setUserDetails={setUserDetails} />} />
        <Route path="/user-details-display" element={<UserDetailsDisplay {...(userDetails || { name: '', mobile: '', desc: '', company: '', address: '', role: '' })} />} />
      </Routes>
    </Router>
  );
}

export default App;
