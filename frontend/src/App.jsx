import { Routes, Route, Navigate } from "react-router-dom";
import CRMLayout from "./layouts/CRMLayout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Segments from "./pages/Segments";
import Campaigns from "./pages/Campaigns";
import CommunicationLogs from "./pages/CommunicationLogs";
import Analytics from "./pages/Analytics";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from './routes/PrivateRoute';  // import PrivateRoute

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="*"
        element={
          <PrivateRoute>
            <CRMLayout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/segments" element={<Segments />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/communication-logs" element={<CommunicationLogs />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </CRMLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;

