import React from "react";

const Sidebar: React.FC = () => {
  return (
    <>
      <aside className="hidden lg:block w-1/5">
        <div className="sticky top-4">
          <h2 className="text-xl font-bold">Sidebar</h2>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
