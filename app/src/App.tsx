import { Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import Homee from "@/pages/Home";
import Profile from "./components/Profile";
import Layout from "./Layout";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="sign-up" element={<Signup />} />
        <Route path="sign-in" element={<SignIn />} />

        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Homee />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<p>404 Not Found</p>} />
      </Routes>
    </>
  );
}

export default App;
