import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Login from "./pages/loginPage";
import Signup from "./pages/signup";
import Home from "./pages/home";
import CheckEmailToVerify from "./pages/checkEmailToVerify";
import Profile from "./pages/profile";
import Bookmarks from "./pages/bookmarks";
import PrivateRoute from "./components/privateRoute";
import PublicRoute from "./components/publicRoute";
import { LocalStorage } from "./utils";
import Layout from "./layout";

function App() {
  const token = LocalStorage.get("token");
  const user = LocalStorage.get("user");

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Root route: Redirects to home if the user is logged in, else to the login page */}
        <Route
          path="/"
          element={
            token && user?._id ? (
              <Navigate to="/home" />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        {/* Public login route: Accessible by everyone */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        {/* Public register route: Accessible by everyone */}
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        {/* <Route
          path={`http://localhost:8080/api/v1/users/verify-email/:verificationToken`}
          element={
            <PublicRoute>
              <VerifyEmail />
            </PublicRoute>
          }
        /> */}
        <Route
          path="/check-email-to-verify"
          element={
            <PublicRoute>
              <CheckEmailToVerify />
            </PublicRoute>
          }
        />
        {/* Private home route: Can only be accessed by authenticated users */}{" "}
        <Route path="/" element={<Layout />}>
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <PrivateRoute>
                <Bookmarks />
              </PrivateRoute>
            }
          />
        </Route>
        {/* Wildcard route for undefined paths. Shows a 404 error */}
        <Route path="*" element={<p>404 Not found</p>} />
      </Routes>
    </>
  );
}

export default App;
