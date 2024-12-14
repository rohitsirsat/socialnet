import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, LogOut, Loader2 } from "lucide-react";
import ThemeToggleButton from "@/theme/themeToggle";
import { useAuth } from "@/context/Auth/AuthContext";

export default function MiniProfileSet() {
  const { logout, user } = useAuth();

  const username = user?.username;

  const handleLogout = async () => await logout();

  return (
    <div className="flex items-center justify-between sm:gap-3 p-4 bg-background text-foreground border rounded-full">
      <div className="flex items-center gap-1">
        <Avatar>
          <AvatarImage className="object-cover" src={user?.avatar.url} />
          <AvatarFallback>{username?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">
            @{username ? username : ""}
          </span>
        </div>
      </div>
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
    </div>
  );
}
