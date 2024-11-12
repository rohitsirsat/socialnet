const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen dark:bg-black">
      <div>
        <svg
          className="animate-spin h-10 w-8 text-blue-500"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <circle
            className="text-blue-500"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="31.4"
            strokeDashoffset="0"
            transform="rotate(-90 12 12)"
          />
        </svg>
      </div>
    </div>
  );
};

export default Loader;
