import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, logoutUser, registerUser } from "@/api";
import Loader from "@/components/loader";
import { LocalStorage } from "@/utils";
import { useToast } from "@/hooks/use-toast";
import { requestHandler } from "@/utils";

// Create a context to manage authentication-related data and functions

const AuthContext = createContext({
  user: null,
  token: null,
  register: async (data) => {},
  login: async (data) => {},
  logout: async () => {},
});

// Custom hook to access the authentication context
const useAuth = () => useContext(AuthContext);

// Create a component that provides the authentication-related data and functions

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const { toast } = useToast();

  // Function to register a new user
  const register = async (data) => {
    await requestHandler(
      async () => await registerUser(data),
      setIsLoading,
      (res) => {
        toast({
          title: res?.data?.message || "Signup Successful",
          description: "You have successfully signed up.",
          variant: "success",
        });
        navigate("/check-email-to-verify");
      },
      (error) => {
        toast({
          title: error?.response?.data?.message || "Signup Failed",
          description: "User with this email or username already exists.",
          variant: "destructive",
        });
      }
    );
  };

  // Function to handle user login
  const login = async (data) => {
    await requestHandler(
      async () => await loginUser(data),
      setIsLoading,
      (res) => {
        const { data } = res;
        setUser(data.user);
        setToken(data.accessToken);
        LocalStorage.set("user", data.user);
        LocalStorage.set("token", data.accessToken);
        toast({
          title: res?.data?.message || "Login Successful",
          description: res.data.message || "You have successfully logged in.",
          variant: "success",
        });
        navigate("/home");
      },
      (error) => {
        toast({
          title: error?.response?.data?.message || "Login Failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
      }
    );
  };

  // Function to handle user logout
  const logout = async () => {
    await requestHandler(
      async () => await logoutUser(),
      setIsLoading,
      () => {
        setUser(null);
        setToken(null);
        LocalStorage.clear();
        toast({
          title: "Logout Successful",
          description: "You have successfully logged out.",
          variant: "success",
        });
        navigate("/login");
      },
      toast({
        title: "Logout Failed",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      })
    );
  };

  // Check for saved user and token in local storage during component initialization
  useEffect(() => {
    setIsLoading(true);
    const _token = LocalStorage.get("token");
    const _user = LocalStorage.get("user");

    if (_token && _user?._id) {
      setUser(_user);
      setToken(_token);
    }
    setIsLoading(false);
  }, []);

  // Provide authentication-related data and functions through the context
  return (
    <AuthContext.Provider value={{ user, login, register, logout, token }}>
      {isLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth, AuthContext };
