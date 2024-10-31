import { Routes, Route, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LandingPage from "@/pages/LandingPage";
import Home from "@/pages/Home";
// import Layout from "./Layout";
import { useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  const { token, user } = useAuth();
  return (
    <Routes>
      {/* Root route: Redirects to chat if the user is logged in, else to the login page */}
      <Route
        path="/home"
        element={token && user?._id ? <Home /> : <Navigate to="/" />}
      ></Route>
      Private chat route: Can only be accessed by authenticated users
      <Route
        path="/"
        element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="/signin"
        element={
          <PublicRoute>
            <Signin />
          </PublicRoute>
        }
      />
      {/* Wildcard route for undefined paths. Shows a 404 error */}
      <Route path="*" element={<p>404 Not found</p>} />
    </Routes>
  );
}

export default App;
