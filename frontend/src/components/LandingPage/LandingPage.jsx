import React, { useState, useEffect } from "react";
import { FaGithub, FaMeta, FaXTwitter } from "react-icons/fa6";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function LandingPage() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div
      className={`min-h-screen flex flex-col relative ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <ParticleBackground />
      <header className="py-4 px-8 flex justify-between items-center z-10 relative">
        <h1 className="text-2xl font-bold text-blue-600 rounded-lg border-2 border-blue-600 px-4">
          SocialNet
        </h1>

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-100 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800"
          >
            Sign In
          </Button>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {theme === "light" ? (
                    <IoMoonOutline className="h-6 w-6" />
                  ) : (
                    <IoSunnyOutline className="h-6 w-6" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </header>
      <hr />

      <main className="flex-grow flex flex-col items-center justify-center p-4 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to{" "}
            <span className="text-blue-600 font-bold">SocialNet</span>
          </h2>
          <p className="text-xl md:text-2xl mb-8">
            Connect, Share, and Engage with the World
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Sign Up
            </Button>
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-100 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800"
            >
              Learn More
            </Button>
          </div>
        </div>
      </main>

      <section className="py-16 px-4 relative z-10">
        <h3 className="text-3xl font-bold text-center mb-8">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <FeatureCard
            title="Post"
            description="Share your thoughts, images, and videos with your followers."
          />
          <FeatureCard
            title="Like"
            description="Show appreciation for content that resonates with you."
          />
          <FeatureCard
            title="Follow"
            description="Stay updated with people and topics that interest you."
          />
        </div>
      </section>
      <hr />
      <footer className="p-4 flex flex-wrap justify-between items-center z-10 relative">
        <p>&copy; 2024 SocialNet. All rights reserved.</p>
        <div className="flex justify-center space-x-4 ">
          <a href="https://x.com/rohit_12cr">
            {" "}
            <FaXTwitter className="h-6 w-6" />
          </a>

          <a
            href="thtps://github.com/rohitsirsat/socialnet"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <FaGithub className="h-6 w-6" />
          </a>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="p-6 rounded-lg bg-white/80 dark:bg-gray-800/80 shadow-lg backdrop-blur-sm">
      <h4 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
        {title}
      </h4>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(500)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-500 rounded-full"
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: ["0%", "100%"],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
