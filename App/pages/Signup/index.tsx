import { useState, useEffect } from "react";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import Wrapper from "../../components/Wrapper";

const Signup = () => {
  return (
    <Wrapper>
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">회원가입</h1>
        </div>
      </div>
    </Wrapper>
  );
};

export default Signup;
