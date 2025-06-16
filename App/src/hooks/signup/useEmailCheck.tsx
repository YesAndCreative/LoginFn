import { useEmailCheckMutation } from "@/utils/signup/authSWR";
import { EmailCheckRequest } from "@/types/signup/auth";

const useEmailCheck = () => {
  const {
    trigger: triggerEmailCheck,
    isMutating: isEmailChecking,
    error: emailCheckError,
  } = useEmailCheckMutation();

  const handleEmailCheck = async (email: EmailCheckRequest) => {
    const result = await triggerEmailCheck(email);

    if (result.success) {
      return result;
    } else {
      return false;
    }
  };

  return {
    handleEmailCheck,

    isEmailChecking,
    emailCheckError,
  };
};

export default useEmailCheck;
