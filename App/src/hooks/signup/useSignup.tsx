import { useSignupMutation } from "@/utils/signup/authSWR";
import type { SignupData } from "@/types/signup/auth";

export const useSignup = () => {
  const {
    trigger: triggerSignup,
    isMutating: isSigningUp,
    error: signupError,
  } = useSignupMutation();

  // 회원가입 실행
  const handleSignup = async (data: SignupData) => {
    try {
      await triggerSignup(data);
      alert("회원가입이 완료되었습니다.");
      return true;
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      return false;
    }
  };

  return {
    // Actions
    handleSignup,

    // States
    isSigningUp,
    signupError,
  };
};

export default useSignup;
