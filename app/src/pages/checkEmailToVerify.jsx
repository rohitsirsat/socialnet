import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { FaEnvelope, FaArrowRight } from "react-icons/fa";

export default function CheckEmailToVerify() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md border-2 border-primary shadow-2xl bg-white dark:bg-gray-800">
        <CardHeader className="space-y-1">
          {mounted && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CardTitle className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                SocialNet
              </CardTitle>
            </motion.div>
          )}
          <CardDescription className="text-center text-gray-600 dark:text-gray-300">
            Verify Your Email
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mounted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center space-y-4"
            >
              <div className="flex justify-center">
                <FaEnvelope className="text-6xl text-blue-500 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Check Your Email
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We've sent a verification link to your email address. Please
                check your inbox and click on the link to verify your account.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                If you don't see the email, check your spam folder.
              </p>
            </motion.div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            asChild
          >
            <Link to="/login">
              Go to Login
              <FaArrowRight className="ml-2" />
            </Link>
          </Button>
          <p className="text-sm text-center text-gray-600 dark:text-gray-300">
            Didn't receive the email?{" "}
            <Link
              to="/resend-verification"
              className="text-blue-500 hover:underline dark:text-blue-400"
            >
              Resend verification email
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
