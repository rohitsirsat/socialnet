import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./theme/themeContex";
import { Toaster } from "./components/ui/toaster";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
