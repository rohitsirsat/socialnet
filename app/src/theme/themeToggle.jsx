import React from "react";

import { useTheme } from "./themeContex";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="py-2 rounded-md transition-colors duration-300 hover:bg-muted hover:text-accent-foreground"
    >
      {theme === "light" ? <FiMoon size={18} /> : <FiSun size={18} />}
    </button>
  );
};

export default ThemeToggleButton;
