// // // // src/routes/PrivateRoute.jsx
// // // import React, { useContext } from 'react';
// // // import { Navigate } from 'react-router-dom';
// // // import { AuthContext } from '../contexts/AuthContext';

// // // const PrivateRoute = ({ children }) => {
// // //   const { user, loading } = useContext(AuthContext);

// // //   if (loading) return <p>Loading...</p>; // or a spinner

// // //   if (!user) {
// // //     return <Navigate to="/login" replace />;
// // //   }

// // //   return children;
// // // };

// // // export default PrivateRoute;

// // import PrivateRoute from './routes/PrivateRoute';

// // function App() {
// //   return (
// //     <Routes>
// //       <Route path="/login" element={<Login />} />

// //       <Route
// //         path="*"
// //         element={
// //           <PrivateRoute>
// //             <CRMLayout>
// //               <Routes>
// //                 <Route path="/dashboard" element={<Dashboard />} />
// //                 <Route path="/customers" element={<Customers />} />
// //                 <Route path="/orders" element={<Orders />} />
// //                 <Route path="/segments" element={<Segments />} />
// //                 <Route path="/campaigns" element={<Campaigns />} />
// //                 <Route path="/communication-logs" element={<CommunicationLogs />} />
// //                 <Route path="/analytics" element={<Analytics />} />
// //                 <Route path="*" element={<Navigate to="/dashboard" />} />
// //               </Routes>
// //             </CRMLayout>
// //           </PrivateRoute>
// //         }
// //       />
// //     </Routes>
// //   );
// // }

// import React, { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../contexts/AuthContext';

// const PrivateRoute = ({ children }) => {
//   const { user, loading } = useContext(AuthContext);

//   if (loading) return <p>Loading...</p>; // You can replace with spinner

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default PrivateRoute;

// src/components/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>; // You can replace with spinner component

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
