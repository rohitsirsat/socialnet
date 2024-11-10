import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/loader";
import { loginUser, logoutUser, registerUser } from "@/api";
import { LocalStorage } from "@/utils";

const AuthContext = createContext({
  user: null,
  token: null,
  register: async () => {},
  login: async () => {},
  logout: async () => {},
});

const useAuth = () => useContext(AuthContext);

// create a component that provides authentication-ralated data and functions

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  // const login user
  const login = async (data) => {
    await loginUser(data)
      .then((res) => {
        setIsLoading(true);
        if (res.status === 200) {
          const { data } = res;
          setUser(data.user);
          setToken(data.accessToken);
          LocalStorage.set("user", data.user);
          LocalStorage.set("token", data.accessToken);
          toast({
            title: "Login Successful",
            description: res.message,
          });
          navigate("/home");
        }
      })
      .catch((err) => {
        toast({
          title: "Login Failed",
          description: err.message,
        });
      });
  };

  const register = async (data) => {
    await registerUser(data)
      .then((res) => {
        setIsLoading(true);
        if (res.status === 200) {
          toast({
            title: "Signup Successful",
            description: res.message,
          });
          navigate("/login");
        }
      })
      .catch((err) => {
        toast({
          title: "Signup Failed",
          description: err.message,
        });
      });
  };

  const logout = async () => {
    await logoutUser()
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(true);
          toast({
            title: "Logout Successful",
            description: res.message,
          });
          setUser(null);
          setToken(null);
          LocalStorage.clear();
          navigate("/login");
        }
      })
      .catch((err) => {
        toast({
          title: "Logout Failed",
          description: err.message,
        });
      });
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
      {isLoading ? <Loader /> : children} {/* Display a loader while loading */}
    </AuthContext.Provider>
  );
};

// Export the context, provider component, and custom hook
export { AuthContext, AuthProvider, useAuth };
