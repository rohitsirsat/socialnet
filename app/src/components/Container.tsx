import React from "react";

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0 text-foreground">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-96">
        {children}
      </div>
    </div>
  );
};

export default Container;

{
  /* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
{children}
</div> */
}
