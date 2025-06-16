import { useEmailVerifyMutation } from "@/utils/signup/authSWR";

const useEmailVerify = () => {
  const {
    trigger: triggerEmailVerify,
    isMutating: isEmailVerifying,
    error: emailVerifyError,
  } = useEmailVerifyMutation();

  const handleEmailVerify = async (authKey: string, code: string) => {
    const result = await triggerEmailVerify({ code, authKey });

    if (result.success) {
      return result;
    } else {
      return false;
    }
  };

  return {
    handleEmailVerify,

    isEmailVerifying,
    emailVerifyError,
  };
};

export default useEmailVerify;
