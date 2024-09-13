import { FaGithub, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-center flex-col-reverse gap-y-2 sm:flex sm:flex-wrap sm:justify-between sm:items-center px-4 z-10 relative py-4 border-t border-border">
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
  );
}
