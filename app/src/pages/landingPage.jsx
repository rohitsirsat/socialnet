import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import ThemeToggleButton from "@/theme/themeToggle";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FiLoader } from "react-icons/fi";

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <ParticleBackground />
      <main className="flex-grow flex flex-col items-center justify-center p-8 relative">
        <div className="absolute top-4 right-4">
          <ThemeToggleButton />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            SocialNet
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold mb-4">
            Connect, Share, and Engage with the World
          </h2>
          <h4 className="text-2xl font-semibold mb-8 text-center">
            Your new favorite social media platform
          </h4>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="flex flex-col items-center gap-1">
            <p className="text-xl mb-8 text-muted-foreground">
              Already have an account...?
            </p>
            <Link to={"/signup"}>
              <Button>
                {isLoading ? (
                  <FiLoader className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Sign up"
                )}
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 w-full max-w-4xl"
        >
          <h3 className="text-2xl font-semibold mb-8 text-center">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Post"
              description="Share your thoughts and moments with your network"
            />
            <FeatureCard
              title="Like"
              description="Engage with content you love and support others"
            />
            <FeatureCard
              title="Follow"
              description="Stay updated with your favorite people and topics"
            />
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <motion.div
      className="p-6 rounded-lg bg-gray-100 dark:bg-gray-800/80 shadow-lg backdrop-blur-sm"
      whileHover={{
        scale: 1.05, // Increase size on hover
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}

function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(400)].map((_, i) => (
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
