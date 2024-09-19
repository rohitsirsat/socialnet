import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import Homee from "@/pages/Home";
import Profile from "./components/Profile";
import Layout from "./Layout";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import { useAuth } from "./context/AuthContext";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const { token, user } = useAuth();
  const home = (
    <PrivateRoute>
      <Homee />
    </PrivateRoute>
  );

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            token && user?._id ? <Navigate to="home" /> : <LandingPage />
          }
        ></Route>

        {/* Public login route: Accessible by everyone */}
        <Route
          path="/sign-up"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Public register route: Accessible by everyone */}
        <Route
          path="/sign-in"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />

        <Route path="/" element={<Layout />}>
          <Route path="home" element={home} />
        </Route>

        <Route path="*" element={<p>404 Not Found</p>} />
      </Routes>
    </>
  );
}

export default App;
