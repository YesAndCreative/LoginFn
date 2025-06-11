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
      const result = await triggerSignup(data);

      if (result.success) {
        alert("회원가입이 완료되었습니다.");
        console.log("회원가입 성공:", result.data);
        return true;
      } else {
        console.error("서버 응답 실패:", result.message);
        alert(
          `회원가입에 실패했습니다: ${result.message || "알 수 없는 오류"}`
        );
        return false;
      }
    } catch (error) {
      console.error("회원가입 요청 오류:", error);
      alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
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
