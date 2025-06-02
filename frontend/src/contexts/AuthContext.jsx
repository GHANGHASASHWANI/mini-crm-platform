// // src/contexts/AuthContext.jsx
// import React, { createContext, useState, useEffect } from 'react';
// import axios from '../api/axiosInstance'; // your axios instance setup

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Check if user is logged in on mount
//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const res = await axios.get('/auth/me'); // backend endpoint to get current user
//         setUser(res.data.user);
//       } catch {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchUser();
//   }, []);

//   // Login or signup function
//   const login = async (token) => {
//     try {
//       // example: send token to backend to verify and get user info
//       const res = await axios.post('/auth/google', { token });
//       setUser(res.data.user);
//     } catch (err) {
//       console.error('Login error:', err);
//       throw err;
//     }
//   };

//   // Logout function
//   const logout = async () => {
//     try {
//       await axios.post('/auth/logout');
//       setUser(null);
//     } catch (err) {
//       console.error('Logout error:', err);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut 
} from 'firebase/auth';
import { app } from '../firebase'; // your firebase config file

export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Auth state changed:', currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error) {
      console.error('Google sign-in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
