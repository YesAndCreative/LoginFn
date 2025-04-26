// For Wrapping the components
// Apply margin to the horizontal edges

import React, { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
  className?: string;
}

const Wrapper: React.FC<WrapperProps> = ({
  children,
  className,
  ...others
}) => {
  return (
    <div
      className={
        "max-w-[1920px] px-[140px]  " +
        "max-xs2:px-[20px] " +
        "max-md2:px-[40px] " +
        "max-lg:px-[60px] " +
        "max-3xl:px-[80px] " +
        className
      }
      {...others}
    >
      {children}
    </div>
  );
};

export default Wrapper;
