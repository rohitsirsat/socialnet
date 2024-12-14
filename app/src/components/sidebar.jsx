import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BookMarked,
  Home,
  User,
  PenSquare,
  LogOut,
  MoreHorizontal,
} from "lucide-react";
import MiniProfileSet from "./miniProfileSet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import ThemeToggleButton from "@/theme/themeToggle";
import CreatePost from "./createPost";
import { useAuth } from "@/context/Auth/AuthContext";

export default function Sidebar() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => await logout();

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
              <div>
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
              </div>
            </li>
            <li>
              <Button
                className="w-9/12 text-white font-bold py-6 rounded-full text-lg"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                Post
              </Button>
            </li>
          </ul>
          <div className="absolute bottom-6">
            <MiniProfileSet />
          </div>
        </nav>
      </div>

      <CreatePost
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />

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
              <Button
                className="text-foreground font-bold py-6 rounded-full text-4xl"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <PenSquare />
              </Button>
            </li>
            <li className="absolute bottom-6 border-2 rounded-full">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 bg-background text-foreground"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col">
                  <DropdownMenuItem>
                    <ThemeToggleButton />
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
