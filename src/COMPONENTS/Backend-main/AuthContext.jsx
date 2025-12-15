// src/COMPONENTS/AuthContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './AppFirebase'; // Assuming AppFirebase exports 'auth'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import GlobalLoaderBoundary from './GlobalLoaderBoundary';

// 1. Create the Auth Context
export const AuthContext = createContext();

// 2. Custom Hook to consume the context easily
export function useAuth() {
  return useContext(AuthContext);
}

// 3. The Auth Provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- 🔒 Authentication Functions ---

  function signUp(legalName, email, password) {
    return createUserWithEmailAndPassword(auth, legalName, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function logOut() {
    return auth.signOut();
  }

  // Effect for setting the current user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Set loading to false once the initial state is determined
    });
    return unsubscribe;
  }, []);

  // 4. Value to be provided by the context
  const value = {
    currentUser,
    signUp,
    login,
    logInWithGoogle,
    logOut,
    // Add other relevant functions/data here
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Only render children when not loading the initial auth state */}
      {!loading && children}
      {loading && <GlobalLoaderBoundary/>} 
    </AuthContext.Provider>
  );
};