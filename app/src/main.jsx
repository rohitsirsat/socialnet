import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./theme/themeContex";
import { Toaster } from "./components/ui/toaster";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Auth/AuthContext";
import { PostProvider } from "./context/Post/PostContext";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PostProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <App />
            <Toaster />
          </ThemeProvider>
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
