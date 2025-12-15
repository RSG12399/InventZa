import React from 'react';
import { NavLink } from 'react-router-dom';

export default

function Sidebar() {
    const linkClass = ({ isActive }) =>
      `sidebar-link${isActive ? " active" : ""}`;

    return (
      <aside className="app-sidebar" style={{
        width: 220,
        padding: 16,
        borderLeft: '1px solid #e6e9ee',
        minHeight: '100vh',
        boxSizing: 'border-box'
      }}>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <NavLink to="/dashboard" className={linkClass} style={{ textDecoration: 'none', color: '#0f172a', padding: 8, borderRadius: 6 }}>
            Dashboard
          </NavLink>
          <NavLink to="/blogs" className={linkClass} style={{ textDecoration: 'none', color: '#0f172a', padding: 8, borderRadius: 6 }}>
            Blogs
          </NavLink>
          <NavLink to="/create-post" className={linkClass} style={{ textDecoration: 'none', color: '#0f172a', padding: 8, borderRadius: 6 }}>
            Create Post
          </NavLink>
        </nav>
      </aside>
    );
};