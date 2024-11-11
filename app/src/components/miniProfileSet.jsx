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
import { apiClient } from "@/api";
import { useState } from "react";
import { LocalStorage } from "@/utils";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function MiniProfileSet() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    setIsLoading(true);
    await apiClient
      .post("/users/logout")
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          const { data } = res;
          setUser(null);
          setToken(null);
          LocalStorage.clear();

          toast({
            title: "Logout Successful",
            description:
              res.data.message || "You have successfully logged out.",
            variant: "success",
          });
          setIsLoading(false);
          navigate("/login");
        }
      })
      .catch((err) => {
        toast({
          title: "Logout Failed",
          description:
            err.response?.data?.message ||
            "Failed to logout. Please try again.",
          variant: "destructive",
        });

        setIsLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-between sm:gap-3 p-4 bg-background text-foreground border rounded-full">
      <div className="flex items-center gap-1">
        <Avatar>
          <AvatarImage alt="User avatar" src="/placeholder.svg" />
          <AvatarFallback>RS</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">@rohit_12g</span>
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
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="mr-2 h-4 w-4" />
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
