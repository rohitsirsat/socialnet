import React from "react";
import { ModeToggle } from "../ModeToggle/ModeToggle";
import { Button } from "../ui/button";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="py-4 px-8 flex justify-between items-center sticky z-10 bg-background top-0 border-b border-border">
      <h1 className="text-2xl font-bold text-blue-600 rounded-lg border-2 border-blue-600 px-4">
        SocialNet
      </h1>

      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          className="border-blue-600 text-blue-600 hover:bg-blue-700 "
        >
          Sign In
        </Button>

        <ModeToggle />
      </div>
    </header>
  );
}
