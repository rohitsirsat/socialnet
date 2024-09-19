import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, logoutUser, registerUser } from "@/api";
import Loader from "@/components/Loader";
import { UserInterface } from "@/interfaces/user";
import { LocalStorage, requestHandler } from "@/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon, RocketIcon } from "@radix-ui/react-icons";

// Create a context
const AuthContext = createContext<{
  user: UserInterface | null;
  token: string | null;
  login: (data: { username: string; password: string }) => Promise<void>;
  register: (data: {
    email: string;
    username: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}>({
  user: null,
  token: null,
  register: async () => {},
  login: async () => {},
  logout: async () => {},
});

// Create a hook to access the AuthContext
const useAuth = () => useContext(AuthContext);

// Create a component that provides authentication-related data and function

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserInterface | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const navigate = useNavigate();

  // Login user
  const login = async (data: { username: string; password: string }) => {
    await requestHandler(
      async () => await loginUser(data),
      setIsLoading,

      (res) => {
        const { data } = res;
        setUser(data.user);
        setToken(data.accessToken);
        LocalStorage.set("user", data.user);
        LocalStorage.set("token", data.accessToken);
        navigate("/home");
      },
      (error) => {
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>{error}</AlertTitle>
          <AlertDescription>Login up failed. Please try again</AlertDescription>
        </Alert>;
      }
    );
  };

  // Register user
  const register = async (data: {
    username: string;
    email: string;
    password: string;
  }) => {
    await requestHandler(
      async () => registerUser(data),
      setIsLoading,
      () => {
        <Alert>
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            Register successfully! Go ahead and Sign In
          </AlertDescription>
        </Alert>;
        navigate("/sign-in");
      },
      (error) => {
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>{error}</AlertTitle>
          <AlertDescription>Sign up failed. Please try again</AlertDescription>
        </Alert>;
      }
    );
  };

  const logout = async () => {
    await requestHandler(
      async () => await logoutUser(),
      setIsLoading,
      () => {
        setUser(null);
        setToken(null);
        LocalStorage.clear();

        navigate("/sign-in");
      },
      (error) => {
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>{error}</AlertTitle>
          <AlertDescription>Logout failed. Please try again</AlertDescription>
        </Alert>;
      }
    );
  };

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

  return (
    <AuthContext.Provider value={{ user, login, logout, register, token }}>
      {isLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

// Export the context, provider component and custom hook
export { AuthContext, AuthProvider, useAuth };
