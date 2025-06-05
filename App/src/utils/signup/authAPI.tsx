import api from "@/lib/axios";
import type {
  SignupData,
  EmailVerificationRequest,
  EmailVerificationResponse,
  VerifyCodeRequest,
  ApiResponse,
} from "@/types/signup/auth";

// 회원가입 API
export const postSignup = async (url: string, { arg }: { arg: SignupData }) => {
  const response = await api.post<ApiResponse<SignupData>>(url, arg);
  return response.data;
};

// 이메일 인증 요청 API
export const requestEmailVerification = async (
  url: string,
  { arg }: { arg: EmailVerificationRequest }
) => {
  try {
    const response = await api.post<EmailVerificationResponse>(url, arg);
    return response.data;
  } catch (error) {
    console.error("이메일 인증 요청 오류:", error);
    throw error;
  }
};

// 이메일 인증 코드 검증 API
export const verifyEmailCode = async (
  url: string,
  { arg }: { arg: VerifyCodeRequest }
) => {
  try {
    const response = await api.post<ApiResponse<{ verified: boolean }>>(
      url,
      arg
    );
    return response.data;
  } catch (error) {
    console.error("인증 코드 검증 오류:", error);
    throw error;
  }
};
