import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer.jsx/Footer";
import { ThemeProvider } from "./components/Theme/ThemeProvider";

export default function Layout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <Outlet />
      <Footer />
    </ThemeProvider>
  );
}
