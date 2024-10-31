// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { LockIcon, UserIcon, EyeIcon, EyeOffIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { useAuth } from "../context/AuthContext";

// export default function Signin() {
//   const [data, setData] = useState({
//     username: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const { login } = useAuth();

//   const handleDataChange =
//     (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
//       setData({
//         ...data,
//         [name]: e.target.value,
//       });
//     };

//   const handleLogin = async () => await login(data);

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-background px-4">
//       <Card className="w-full max-w-md dark:bg-gray-900">
//         <CardHeader className="space-y-1">
//           <Link to="/" className="block mb-6">
//             <CardTitle className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 animate-gradient-text">
//               SocialNet
//             </CardTitle>
//           </Link>
//           <CardDescription className="text-center text-muted-foreground">
//             Sign in to your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="space-y-2">
//             <div className="flex items-center space-x-2">
//               <UserIcon className="h-5 w-5 text-muted-foreground" />
//               <Label htmlFor="username" className="text-lg">
//                 Username
//               </Label>
//             </div>
//             <Input
//               id="username"
//               placeholder="Enter your username"
//               value={data.username}
//               onChange={handleDataChange("username")}
//             />
//           </div>
//           <div className="space-y-2">
//             <div className="flex items-center space-x-2">
//               <LockIcon className="h-5 w-5 text-muted-foreground" />
//               <Label htmlFor="password" className="text-lg">
//                 Password
//               </Label>
//             </div>
//             <div className="relative">
//               <Input
//                 id="password"
//                 placeholder="Enter your password"
//                 type={showPassword ? "text" : "password"}
//                 value={data.password}
//                 onChange={handleDataChange("password")}
//                 className="pr-10"
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
//               >
//                 {showPassword ? (
//                   <EyeOffIcon className="h-5 w-5" />
//                 ) : (
//                   <EyeIcon className="h-5 w-5" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </CardContent>
//         <CardFooter className="flex flex-col space-y-4">
//           <Button
//             disabled={Object.values(data).some((val) => !val)}
//             onClick={handleLogin}
//             className="w-full text-lg py-6"
//           >
//             Sign In
//           </Button>
//           <p className="text-sm text-center text-muted-foreground">
//             Don't have an account?{" "}
//             <Link
//               to="/signup"
//               className="text-primary hover:underline font-medium"
//             >
//               Sign up
//             </Link>
//           </p>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

import React from "react";

const Signin: React.FC = () => {
  return <div>Signin</div>;
};

export default Signin;
