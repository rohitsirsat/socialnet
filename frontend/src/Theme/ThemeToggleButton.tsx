import React from "react";

import { useTheme } from "@/Theme/ThemeContext";
import { Moon, Sun } from "lucide-react";
// import { s } from "framer-motion/client";

const ThemeToggleButton: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-md transition-colors duration-300 hover:bg-muted hover:text-accent-foreground"
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
};

export default ThemeToggleButton;
