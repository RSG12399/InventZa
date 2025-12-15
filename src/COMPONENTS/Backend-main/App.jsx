import React, { useEffect, useState, useContext } from 'react';
import { Route, Routes, BrowserRouter, NavLink } from 'react-router-dom';
import LandingPage from '../landingpage';
import Signup from '../USER SIDE/Signup';
import Login from '../USER SIDE/Login';
import Dashboard from '../USER SIDE/Dashboard';
import Explore from '../Explore';
import FileUpload from '../USER SIDE/FileUpload';
import BlogsPage from '../USER SIDE/BlogsPage';
import { AuthContext, AuthProvider } from './AuthContext';
import Sidebar from '../USER SIDE/Sidebar';
import LoadingPage from '../USER SIDE/loadingPage';

// Sidebar component — visible only when user is signed in //

// Main App component
function App() {
  const user = useContext(AuthContext);

  useEffect(() => {
    document.title = "InventZa | Innovate Your World";
  }, []);

  // helper: safely render imported components (gives clear fallback if import is missing/invalid)
  const safeElement = (Comp, props = {}) => {
    if (!Comp) {
      return <div style={{ padding: 16, color: '#b91c1c' }}>Missing component (import returned undefined)</div>;
    }
    if (typeof Comp !== 'function') {
      return <div style={{ padding: 16, color: '#b91c1c' }}>Invalid component type: expected a function/class but got {typeof Comp}</div>;
    }
    return <Comp {...props} />;
  };

  return (
    <div className='App' style={{ display: 'flex', minHeight: '100vh' }}>
      <AuthProvider>
        <BrowserRouter>

          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/explore" element={<Explore />} />
              
              <Route path="/loadingPage" element={<LoadingPage />} />
              {/* app pages — components can read current user via AuthContext */}
              <Route path="/dashboard" element={user ? <Dashboard /> : <Login />} />
              <Route path="/blogs" element={user ? <BlogsPage /> : <Login />} />
              <Route path="/fileupload" element={user ? <FileUpload /> : <Login />} />
              <Route path="/sidebar" element={user ? <Sidebar/> : <Login />} />

              {/* fallback could be added */}
            </Routes>
          </main>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;