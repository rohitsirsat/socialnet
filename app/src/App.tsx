import { Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import Homee from "@/pages/Home";
import Profile from "./components/Profile";
import Layout from "./Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>

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
