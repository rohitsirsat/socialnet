import {
  Bell,
  BookMarked,
  Home,
  Mail,
  Search,
  User,
  PenSquare,
  Palette,
} from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/Theme/ModeToggle";

const NavMenu = () => {
  return (
    <>
      {/* Sidebar (hidden on mobile) */}
      <div className="hidden md:block md:col-span-1 lg:col-span-1">
        <div className=" sticky top-0 p-4">
          <nav className="space-y-4 ml-28">
            <Link to="home">
              <h1 className="text-3xl font-bold text-primary ml-4">
                SocialNet
              </h1>
            </Link>
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-8 w-8" />
              <span className="text-xl">Home</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-foreground"
            >
              <BookMarked className="mr-2 h-8 w-8" />
              Bookmarks
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-foreground"
            >
              <Search className="mr-2 h-8 w-8" />
              Explore
            </Button>
            <Link to="messages">
              <Button
                variant="ghost"
                className="w-full justify-start text-foreground"
              >
                <Mail className="mr-2 h-8 w-8" />
                Messages
              </Button>
            </Link>

            <Link to="/profile">
              <Button
                variant="ghost"
                className="w-full justify-start text-foreground"
              >
                <User className="mr-2 h-8 w-8" />
                Profile
              </Button>
            </Link>
            <Button className=" bg-primary text-primary-foreground hover:bg-primary-foreground">
              Tweet
            </Button>
          </nav>
        </div>
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="flex justify-around items-center h-16">
          <Button
            variant="ghost"
            className="flex-1 flex flex-col items-center justify-center h-full text-foreground"
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-1 flex flex-col items-center justify-center h-full text-foreground"
          >
            <Search className="h-5 w-5" />
            <span className="text-xs mt-1">Search</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-1 flex flex-col items-center justify-center h-full text-foreground"
          >
            <Bell className="h-5 w-5" />
            <span className="text-xs mt-1">Notifications</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-1 flex flex-col items-center justify-center h-full text-foreground"
          >
            <Mail className="h-5 w-5" />
            <span className="text-xs mt-1">Messages</span>
          </Button>
        </div>
      </nav>

      {/* Mobile Tweet Button */}
      <Button className="md:hidden fixed right-4 bottom-20 rounded-full w-14 h-14 bg-primary hover:bg-primary-foreground text-primary-foreground flex items-center justify-center">
        <PenSquare className="h-6 w-6" />
      </Button>
    </>
  );
};

export default NavMenu;
