import useSWRMutation from "swr/mutation";
import {
  postSignup,
  requestEmailVerification,
  verifyEmailCode,
} from "@/lib/api/auth.api";
import { AUTH_ENDPOINTS } from "@/lib/constants/endpoints";

// 회원가입 뮤테이션
export const useSignupMutation = () => {
  return useSWRMutation(AUTH_ENDPOINTS.SIGNUP, postSignup);
};

// 이메일 인증 요청 뮤테이션
export const useEmailVerificationMutation = () => {
  return useSWRMutation(AUTH_ENDPOINTS.CHECK_EMAIL, requestEmailVerification);
};

// 이메일 인증 코드 검증 뮤테이션
export const useVerifyCodeMutation = () => {
  return useSWRMutation(AUTH_ENDPOINTS.VERIFY_EMAIL, verifyEmailCode);
};
