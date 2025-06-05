import useSWRMutation from "swr/mutation";
import {
  postSignup,
  requestEmailVerification,
  verifyEmailCode,
} from "@/utils/signup/authAPI";

// 회원가입 뮤테이션
export const useSignupMutation = () => {
  return useSWRMutation("/user/signup", postSignup);
};

// 이메일 인증 요청 뮤테이션
export const useEmailVerificationMutation = () => {
  return useSWRMutation("/user/register/checkEmail", requestEmailVerification);
};

// 이메일 인증 코드 검증 뮤테이션
export const useVerifyCodeMutation = () => {
  return useSWRMutation("/user/register/verifyEmail", verifyEmailCode);
};
