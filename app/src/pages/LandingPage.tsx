import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import Footer from "@/components/Footer/Footer";
import { ModeToggle } from "@/Theme/ModeToggle";

export default function LandingPage() {
  // const [theme, setTheme] = useState("light");

  // useEffect(() => {
  //   const savedTheme = localStorage.getItem("theme") || "light";
  //   setTheme(savedTheme);
  //   document.documentElement.classList.toggle("dark", savedTheme === "dark");
  // }, []);

  // const toggleTheme = () => {
  //   const newTheme = theme === "light" ? "dark" : "light";
  //   setTheme(newTheme);
  //   localStorage.setItem("theme", newTheme);
  //   document.documentElement.classList.toggle("dark", newTheme === "dark");
  // };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <ParticleBackground />
      <main className="flex-grow flex flex-col items-center justify-center p-8 relative">
        {/* <Button
          onClick={() => setTheme("light")}
          variant="outline"
          size="icon"
          className="absolute top-4 right-4"
        >
          {theme === "light" ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button> */}
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary">
            SocialNet
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold mb-4">
            Connect, Share, and Engage with the World
          </h2>
          <p className="text-xl mb-8 text-muted-foreground">
            Your new favorite social media platform
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="flex flex-col gap-1">
            <h4 className="text-2xl font-semibold mb-8 text-center">
              Already have an account...?
            </h4>
            <Button>Sign In</Button>
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

type FeatureCardProps = {
  title: string;
  description: string;
};

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-lg bg-white/80 dark:bg-gray-800/80 shadow-lg backdrop-blur-sm">
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-muted-foreground">{description}</p>
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
