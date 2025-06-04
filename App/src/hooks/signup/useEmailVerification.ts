import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { requestEmailVerification, verifyEmailCode } from "@/lib/api/auth.api";
import type { VerifyCodeRequest } from "@/types/auth";

export const useEmailVerification = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [authKey, setAuthKey] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  // SWR Mutations
  const {
    trigger: triggerEmailVerification,
    isMutating: isRequestingVerification,
  } = useSWRMutation("/api/user/register/checkEmail", requestEmailVerification);

  const { trigger: triggerVerifyCode, isMutating: isVerifyingCode } =
    useSWRMutation("/api/user/register/verifyEmail", verifyEmailCode);

  // 이메일 인증 요청
  const handleRequestVerification = async (email: string) => {
    if (!email) {
      alert("이메일을 입력해주세요.");
      return false;
    }

    try {
      const result = await triggerEmailVerification({ email });

      // authKey는 result.data 안에 있음
      if (result && result.data && result.data.authKey) {
        const key = result.data.authKey;
        setAuthKey(key);
      }

      // Show verification UI
      setShowVerification(true);
      alert("인증 메일이 발송되었습니다. 이메일을 확인해주세요.");
      return true;
    } catch (error) {
      console.error("인증 메일 발송 실패:", error);
      alert("인증 메일 발송에 실패했습니다. 다시 시도해주세요.");
      return false;
    }
  };

  // 인증 코드 검증
  const handleVerifyCode = async () => {
    if (!verificationCode) {
      alert("인증번호를 입력해주세요.");
      return false;
    }

    if (!authKey) {
      alert("인증키가 없습니다. 이메일 인증을 다시 요청해주세요.");
      return false;
    }

    try {
      const requestData: VerifyCodeRequest = {
        code: verificationCode,
        authKey: authKey,
      };

      await triggerVerifyCode(requestData);

      setIsEmailVerified(true);
      alert("이메일 인증이 완료되었습니다.");
      return true;
    } catch (error) {
      console.error("인증 코드 검증 실패:", error);
      alert("인증번호가 올바르지 않습니다. 다시 확인해주세요.");
      return false;
    }
  };

  // 인증 상태 초기화
  const resetVerification = () => {
    setVerificationCode("");
    setIsEmailVerified(false);
    setAuthKey("");
    setShowVerification(false);
  };

  return {
    // States
    verificationCode,
    isEmailVerified,
    showVerification,
    authKey,

    // Loading states
    isRequestingVerification,
    isVerifyingCode,

    // Actions
    setVerificationCode,
    handleRequestVerification,
    handleVerifyCode,
    resetVerification,
  };
};
