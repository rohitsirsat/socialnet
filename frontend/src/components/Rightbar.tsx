import React from "react";

const Rightbar: React.FC = () => {
  return (
    <>
      <aside className="hidden lg:block w-1/5">
        <div className="sticky top-4">
          <h2 className="text-xl font-bold">Right Section</h2>
        </div>
      </aside>
    </>
  );
};

export default Rightbar;
