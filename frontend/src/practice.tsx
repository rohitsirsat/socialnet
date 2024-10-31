import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex justify-center min-h-screen bg-gray-900 text-white px-4 sm:px-6 lg:px-8">
      <div className="container max-w-7xl flex gap-6 py-4">
        {/* Sidebar */}
        <aside className="hidden lg:block w-1/5">
          <div className="sticky top-4">
            <h2 className="text-xl font-bold">Sidebar</h2>
            {/* Sidebar content here */}
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full lg:w-3/5 px-4 sm:px-6">
          {children || <h1 className="text-3xl font-bold">Main Content</h1>}
        </main>
        <aside className="hidden lg:block w-1/5">
          <div className="sticky top-4">
            <h2 className="text-xl font-bold">Right Section</h2>
            {/* Right section content here */}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Layout;
