import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User2, MessageCircle, Share2, ArrowRight } from "lucide-react";
import ThemeToggleButton from "@/Theme/ThemeToggleButton";
import Loader from "@/components/Loader";

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(false);

  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: [0.3, 0.5, 0.3],
      scale: [1, 1.1, 1],
      rotate: [0, 10, 0],
      transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
    });
  }, [controls]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-primary opacity-20 blur-3xl"
          style={{ top: "-40%", left: "-20%", width: "140%", height: "140%" }}
          animate={controls}
        />
      </div>

      <div className="container mx-auto px-4 py-4 relative z-10">
        <nav className="flex justify-between items-center sm:mb-32 md:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to={"/"}>
              <h1 className="text-2xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 animate-gradient-text">
                SocialNet
              </h1>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ThemeToggleButton />
          </motion.div>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <h2 className="text-5xl font-bold leading-tight">
              Connect, Share, and Engage with SocialNet
            </h2>
            <Link to={"signup"} className="space-y-2">
              <Button className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                {isLoading ? (
                  <div className="flex justify-center items-center text-2xl h-[100vh]">
                    <Loader />
                  </div>
                ) : (
                  "Get Started"
                )}
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-card rounded-2xl p-8 shadow-lg"
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <User2 className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold">Connect</h3>
                  <p className="text-sm text-muted-foreground">
                    Build meaningful connections with people around the world.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <Share2 className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold">Share</h3>
                  <p className="text-sm text-muted-foreground">
                    Share your moments and experiences with your network.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <MessageCircle className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold">Communicate</h3>
                  <p className="text-sm text-muted-foreground">
                    Engage in rich conversations and share ideas effortlessly
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-0 left-0 right-0 p-4 text-center text-sm text-muted-foreground"
      >
        <nav className="space-x-4">
          <Link to={"#"} className="hover:text-primary transition-colors">
            About
          </Link>
          <Link to={"#"} className="hover:text-primary transition-colors">
            Help Center
          </Link>
          <Link to={"#"} className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link to={"#"} className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link to={"#"} className="hover:text-primary transition-colors">
            Cookie Policy
          </Link>
          <Link to={"#"} className="hover:text-primary transition-colors">
            Accessibility
          </Link>
          <Link to={"#"} className="hover:text-primary transition-colors">
            Ads Info
          </Link>
        </nav>
        <p className="mt-4">&copy; 2024 SocialNet Corp.</p>
      </motion.footer>
    </div>
  );
}
