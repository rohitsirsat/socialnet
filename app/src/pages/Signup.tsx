import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { LockKeyhole } from "lucide-react";
import React, { useState } from "react";

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const { register } = useAuth();

  const handleDataChange =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setData({
        ...data,
        [name]: e.target.value,
      });
    };

  const handleRegister = async () => await register(data);

  return (
    <div className="flex justify-center items-center flex-col h-screen w-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-8 text-primary">SocialNet</h1>
      <div className="flex flex-col items-center max-w-md w-full p-8 bg-card shadow-md rounded-2xl border border-border">
        <div className="flex flex-col items-center gap-y-4">
          <LockKeyhole className="h-8 w-8 mr-2" />
          <h1 className="inline-flex items-center text-xl font-semibold mb-6 text-center">
            Sign Up
          </h1>
        </div>

        {/* Input for username */}
        <Input
          placeholder="Enter the username..."
          value={data.username}
          onChange={handleDataChange("username")}
          className="mb-4 bg-input border-border focus:ring-ring focus:border-primary"
        />

        {/* Input for email */}
        <Input
          placeholder="Enter the email..."
          type="email"
          value={data.email}
          onChange={handleDataChange("email")}
          className="mb-4 bg-input border-border focus:ring-ring focus:border-primary"
        />

        {/* Input for password */}
        <Input
          placeholder="Enter the password..."
          type="password"
          value={data.password}
          onChange={handleDataChange("password")}
          className="mb-6 bg-input border-border focus:ring-ring focus:border-primary"
        />

        {/* Sign Up Button */}
        <Button
          disabled={Object.values(data).some((val) => !val)}
          onClick={handleRegister}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Sign Up
        </Button>

        {/* Link to Login */}
        <small className="block mt-6 text-muted-foreground">
          Already have an account?{" "}
          <a className="text-primary hover:underline" href="/sign-in">
            Login
          </a>
        </small>
      </div>
    </div>
  );
};

export default Signup;
