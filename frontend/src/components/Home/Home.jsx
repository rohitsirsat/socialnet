import React, { useState } from "react";
import {
  FiHome,
  FiUsers,
  FiFileText,
  FiCalendar,
  FiUserPlus,
  FiBell,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import { ScrollArea } from "../ui/scroll-area";

const navItems = [{ icon: FiHome, label: "Home" }];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Main content area */}
      <div className="flex-1 flex">
        {/* Left Sidebar with border */}
        <aside className="w-64 bg-card p-4 hidden md:block overflow-y-auto h-[calc(100vh-4rem)] sticky top-16 border-r border-border">
          <nav>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href="#"
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted"
                  >
                    <item.icon className="text-primary" />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        {/* Main Content with border */}
        <main className="flex-1 p-4 overflow-y-auto border-l border-r border-border">
          <div className="container mx-auto">
            <ScrollArea className="container mx-auto">
              <h1 className="text-4xl font-bold">Posts</h1>
            </ScrollArea>
          </div>
        </main>
        *{/* Right Sidebar with border */}
        <aside className="w-64 bg-card p-4 hidden lg:block overflow-y-auto h-[calc(100vh-4rem)] sticky top-16 border-l border-border">
          <h2 className="font-bold mb-4">Who to follow</h2>
          <ul className="space-y-4">
            {/* {["Jane Doe", "John Smith", "Alice Johnson"].map((name) => (
              <li key={name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src="/placeholder.svg?height=32&width=32"
                    alt={name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{name}</span>
                </div>
                <button className="text-primary hover:bg-primary-foreground px-2 py-1 rounded">
                  Follow
                </button>
              </li>
            ))} */}
          </ul>
        </aside>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden bg-card border-t fixed bottom-0 left-0 right-0">
        <ul className="flex justify-around">
          {navItems.map((item) => (
            <li key={item.label}>
              <a href="#" className="flex flex-col items-center p-2 text-xs">
                <item.icon className="text-primary mb-1" size={20} />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
