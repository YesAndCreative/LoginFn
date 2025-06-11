import useSWRMutation from "swr/mutation";
import {
  postSignup,
  requestEmailCheck,
  verifyEmailCode,
} from "@/utils/signup/authAPI";

// 회원가입 뮤테이션
export const useSignupMutation = () => {
  return useSWRMutation("api/user/register", postSignup);
};

// 이메일 인증 요청 뮤테이션
export const useEmailCheckMutation = () => {
  return useSWRMutation("api/user/register/checkEmail", requestEmailCheck);
};

// 이메일 인증 코드 검증 뮤테이션
export const useVerificationMutation = () => {
  return useSWRMutation("api/user/register/verifyEmail", verifyEmailCode);
};
