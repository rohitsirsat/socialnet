import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { FaUser, FaLock } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { LocalStorage } from "@/utils";

import { apiClient } from "@/api";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async () => {
    setIsLoading(true);
    await apiClient
      .post("/users/login", { username, password })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          const { data } = res;
          setUser(data.user);
          setToken(data.accessToken);
          LocalStorage.set("user", data.data.user);
          LocalStorage.set("token", data.data.accessToken);
          toast({
            title: "Login Successful",
            description: res.data.message || "You have successfully logged in.",
            variant: "success",
          });
          setIsLoading(false);
          navigate("/home");
        }
      })
      .catch((err) => {
        toast({
          title: "Login Failed",
          description:
            err.response?.data?.message ||
            "User with this email or username already exists.",
          variant: "destructive",
        });

        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Link to="/">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          SocialNet
        </h1>
      </Link>
      <Card className="w-full max-w-md border-gray-700">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
          <CardDescription className="text-center">
            Login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleLogin}
          >
            {isLoading ? (
              <>
                <FiLoader className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Login"
            )}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
