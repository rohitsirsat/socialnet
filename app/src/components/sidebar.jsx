import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { BookMarked, Home, User, PenSquare, LogOut } from "lucide-react";
import MiniProfileSet from "./miniProfileSet";

export default function Sidebar() {
  return (
    <>
      <div className="hidden sm:block h-full pl-4 pt-1">
        <NavLink to="/home">
          <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            SocialNet
          </h1>
        </NavLink>
        <nav>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive
                    ? "text-2xl font-bold inline-block p-1 rounded-lg"
                    : "inline-block p-1 rounded-lg hover:bg-accent hover:text-accent-foreground"
                }
              >
                <div className="flex items-center gap-x-4">
                  <Home />
                  <p className="text-xl">Home</p>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/bookmarks"
                className={({ isActive }) =>
                  isActive
                    ? "text-2xl font-bold inline-block p-1 rounded-lg"
                    : "inline-block p-1 rounded-lg hover:bg-accent hover:text-accent-foreground"
                }
              >
                <div className="flex items-center gap-4 py-2">
                  <BookMarked />
                  <p className="text-xl">Bookmarks</p>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-2xl font-bold inline-block p-1 rounded-lg"
                    : "inline-block p-1 rounded-lg hover:bg-accent hover:text-accent-foreground"
                }
              >
                <div className="flex items-center gap-4 py-2">
                  <User />
                  <p className="text-xl">Profile</p>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/post">
                <Button className="w-9/12 text-foreground font-bold py-6 rounded-full text-lg">
                  Post
                </Button>
              </NavLink>
            </li>
          </ul>
          <div className="absolute bottom-6">
            <MiniProfileSet />
          </div>
        </nav>
      </div>
      {/* // Mobile sidebar */}
      <div className="sm:hidden pt-4">
        <nav>
          <ul className="flex flex-col items-center space-y-8">
            <li>
              <NavLink to="/home">
                <Home />
              </NavLink>
            </li>
            <li>
              <NavLink to="/bookmarks">
                <BookMarked />
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile">
                <User />
              </NavLink>
            </li>
            <li>
              <NavLink to={"/post"}>
                <Button className="text-foreground font-bold py-6 rounded-full text-4xl">
                  <PenSquare />
                </Button>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
