import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import Medicines from "./pages/Medicines";
import Invoices from "./pages/Invoices";
import Billing from "./pages/Billing";
import Users from "./pages/Users";
import AdminRoute from
"./components/AdminRoute";
import Analytics from "./pages/Analytics";
import ResetPassword
from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
  path="/medicines"
  element={<Medicines />}
/>
<Route
  path="/invoices"
  element={<Invoices />}
/>
<Route
  path="/billing"
  element={<Billing />}
/>
<Route
  path="/users"
  element={
    <AdminRoute>
      <Users />
    </AdminRoute>
  }
/>
<Route
  path="/analytics"
  element={<Analytics />}
/>
<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/><Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;