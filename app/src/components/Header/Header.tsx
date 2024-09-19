import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/Theme/ModeToggle";
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-2">
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background text-foreground backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="hidden sm:block">
              <Input
                className="w-64 bg-gray-800 border-gray-700 focus:border-blue-500"
                placeholder="Search..."
                type="search"
              />
            </div>
            <ModeToggle />
          </div>
        </div>
        <div>{children}</div>
      </header>
    </div>
  );
};

export default Container;
