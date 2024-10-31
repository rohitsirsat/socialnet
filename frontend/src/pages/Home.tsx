import React from "react";
import { HomeIcon, InfoIcon, ListIcon, MailIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HomePage: React.FC = () => {
  return (
    // <div className="min-h-screen">
    //   {/* Sidebar */}
    //   <aside className="flex flex-col items-center w-16 bg-[var(--card)] py-8 space-y-8 border-r-[var(--border)]">
    //     <HomeIcon className="w-6 h-6 text-[var(--foreground)]" />
    //     <InfoIcon className="w-6 h-6 text-[var(--foreground)]" />
    //     <ListIcon className="w-6 h-6 text-[var(--foreground)]" />
    //     <MailIcon className="w-6 h-6 text-[var(--foreground)]" />
    //   </aside>

    //   {/* Main Content */}
    //   <main className="flex-1 p-8 space-y-6">
    //     {/* Profile Section */}
    //     <Card className="p-6 bg-[var(--card)] rounded-xl shadow-md">
    //       <img
    //         src="https://your-image-url.com/profile-banner.jpg"
    //         alt="Profile Banner"
    //         className="w-full h-48 rounded-lg object-cover mb-4"
    //       />
    //       <h1 className="text-3xl font-bold">
    //         Hi, I'm <span className="text-[var(--primary)]">Your Name</span>
    //       </h1>
    //       <p className="text-xl">
    //         I make <span className="text-[var(--secondary)]">full-stack</span>{" "}
    //         products that people{" "}
    //         <span className="text-[var(--accent)]">love</span>.
    //       </p>
    //       <p className="mt-4 text-base">
    //         Developer, founder, and content creator. I share coding tutorials
    //         and tech insights.
    //       </p>
    //       <div className="flex space-x-4 mt-4">
    //         {/* Social Icons */}
    //         <HomeIcon className="w-5 h-5" />
    //         <InfoIcon className="w-5 h-5" />
    //         <ListIcon className="w-5 h-5" />
    //         <MailIcon className="w-5 h-5" />
    //       </div>
    //     </Card>

    //     {/* Subscription Card */}
    //     <Card className="p-6 bg-[var(--card)] rounded-xl shadow-md text-center">
    //       <div className="flex justify-center mb-4">
    //         {/* Avatar Group */}
    //         <img
    //           src="https://your-image-url.com/avatar1.jpg"
    //           alt="Avatar"
    //           className="w-8 h-8 rounded-full"
    //         />
    //         <img
    //           src="https://your-image-url.com/avatar2.jpg"
    //           alt="Avatar"
    //           className="w-8 h-8 rounded-full -ml-4"
    //         />
    //         <img
    //           src="https://your-image-url.com/avatar3.jpg"
    //           alt="Avatar"
    //           className="w-8 h-8 rounded-full -ml-4"
    //         />
    //       </div>
    //       <h2 className="text-lg font-semibold">Subscribe to my newsletter!</h2>
    //       <p className="text-sm mb-4">
    //         Follow my journey in tech, coding, and more.
    //       </p>
    //       <Input placeholder="Your email..." className="w-full mb-4" />
    //       <Button className="w-full bg-[var(--primary)] hover:bg-[var(--primary-foreground)]">
    //         Subscribe
    //       </Button>
    //     </Card>
    //   </main>
    // </div>

    <>
      <main className="w-full lg:w-3/5 px-4 sm:px-6">
        {<h1 className="text-3xl font-bold">Main Content</h1>}
      </main>
    </>
  );
};

export default HomePage;
