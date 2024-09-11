import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div
      className={`min-h-screen flex flex-col relative "bg-gray-100 text-gray-900"}`}
    >
      <ParticleBackground />

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

      {/* Adjusted the padding for <section> */}
      <section className="py-16 px-4 relative z-10">
        <h3 className="text-3xl font-bold text-center mb-10">Key Features</h3>
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
