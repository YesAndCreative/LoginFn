import React from "react";
import Wrapper from "../Layout/Wrapper";

const Header = () => {
  return (
    <header className="fixed top-0 z-[1000] w-full h-[50px] min-h-[50px] bg-black border pointer-events-none">
      <Wrapper className="flex h-full items-center justify-between">
        <div className="LOGO text-white">Logo</div>
        <div className="NAVIGATION/SIGNUP text-white flex items-center gap-4">
          <div>Navigation</div>
          <div>Signup</div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
