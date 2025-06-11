import { useEmailCheckMutation } from "@/utils/signup/authSWR";

const useEmailCheck = () => {
  const {
    trigger: triggerEmailCheck,
    isMutating: isEmailChecking,
    error: emailCheckError,
  } = useEmailCheckMutation();

  const handleEmailCheck = async (email: string) => {
    const result = await triggerEmailCheck(email);
    console.log("result :", result);
  };

  return {
    handleEmailCheck,

    isEmailChecking,
    emailCheckError,
  };
};

export default useEmailCheck;
