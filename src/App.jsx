import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import VerifyEmailSent from "./pages/auth/VerifyEmailSent";

import DashboardLayout from "./components/dashboard/DashboardLayout";

import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/dashboard/Profile";
import CreateTrip from "./pages/dashboard/CreateTrip";
import MyTrips from "./pages/dashboard/MyTrips";
import TripDetails from "./pages/dashboard/TripDetails";
import EditTrip from "./pages/dashboard/EditTrip";
import Favorites from "./pages/dashboard/Favorites";
import SharedTrip from "./pages/public/SharedTrip";

function App() {
  return (
    <Routes>
      {/* Public Routes */}

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />

      <Route
        path="/reset-password/:token"
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />

      <Route
        path="/verify-email/:token"
        element={
          <PublicRoute>
            <VerifyEmail />
          </PublicRoute>
        }
      />

      <Route
        path="/verify-email-sent"
        element={
          <PublicRoute>
            <VerifyEmailSent />
          </PublicRoute>
        }
      />

      {/* Protected Dashboard Routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        <Route path="profile" element={<Profile />} />

        <Route path="create-trip" element={<CreateTrip />} />
        <Route path="my-trips" element={<MyTrips />} />
        <Route path="trips/:id" element={<TripDetails />} />
        <Route path="trips/edit/:id" element={<EditTrip />} />
        <Route path="favorites" element={<Favorites />} />
      </Route>

      <Route path="/share/:id" element={<SharedTrip />} />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
