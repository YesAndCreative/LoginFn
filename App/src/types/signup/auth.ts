import { ReactNode } from "react";

export interface SignupData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  birth: string;
}

export interface EmailVerificationRequest {
  email: string;
}

export interface EmailVerificationResponse {
  data: {
    authKey: string;
  };
}

export interface VerifyCodeRequest {
  code: string;
  authKey: string;
}

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success?: boolean;
}

export interface ICustomFormField {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  description: string;
  renderCustomField?: (props: ICustomFormField) => ReactNode;
}
