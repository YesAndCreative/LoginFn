import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Loader from "@/components/common/Loader";
import { signupFormSchema, type SignupFormData } from "@/lib/signup/validation";
import CustomFormField from "@/components/common/CustomFormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ICustomFormField } from "@/types/signup/auth";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import useSignup from "@/hooks/signup/useSignup";
import useEmailCheck from "@/hooks/signup/useEmailCheck";
import useEmailVerify from "@/hooks/signup/useEmailVerify";

const Signup = () => {
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [emailAuthKey, setEmailAuthKey] = useState<string>("");
  const [emailVerifyCode, setEmailVerifyCode] = useState<string>("");

  const { handleSignup, isSigningUp, signupError } = useSignup();
  const { handleEmailCheck, isEmailChecking, emailCheckError } =
    useEmailCheck();
  const { handleEmailVerify, isEmailVerifying, emailVerifyError } =
    useEmailVerify();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      tel: "",
      birth: "",
      password: "",
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "emailVerify") {
      setEmailVerifyCode(value);
    }
  };

  const onEmailCheck = async () => {
    const isEmailValid = await form.trigger("email");
    if (isEmailValid) {
      const email = form.getValues("email");

      const data = await handleEmailCheck({ email });

      if (data) {
        console.log("이메일 인증 요청을 발송했습니다");
        setEmailAuthKey(data.data.authKey);
      } else {
        console.error("이메일 인증 요청 실패 :", emailCheckError);
        alert("이메일 인증 요청에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  const onEmailVerify = async () => {
    const data = await handleEmailVerify(emailVerifyCode, emailAuthKey);
    console.log("data :", data);
  };

  const onSubmit = async (values: SignupFormData) => {
    const signupData = {
      email: values.email,
      password: values.password,
      name: values.username,
      phoneNumber: values.tel,
      birth: values.birth,
    };

    const success = await handleSignup(signupData);

    if (success) {
      form.reset();
    } else {
      console.error("회원가입 실패:", signupError);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const renderEmailField = ({
    control,
    name,
    label,
    description,
  }: ICustomFormField) => (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="flex gap-2">
            <FormControl>
              <Input
                placeholder="example@email.com"
                {...field}
                className="flex-1"
              />
            </FormControl>
            <Button
              type="button"
              variant="outline"
              onClick={onEmailCheck}
              className="whitespace-nowrap"
            >
              Check
            </Button>
          </div>
          {!emailAuthKey && <FormDescription>{description}</FormDescription>}
          {emailAuthKey && (
            <div className="flex gap-2 mt-1">
              <Input
                name="emailVerify"
                value={emailVerifyCode}
                placeholder="Enter the code"
                onChange={handleInputChange}
              />
              <Button
                type="button"
                variant="outline"
                onClick={onEmailVerify}
                className="whitespace-nowrap"
              >
                Verify
              </Button>
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const formFieldConfig = [
    {
      name: "username",
      label: "Username",
      placeholder: "shadcn",
      description: "This is your public display name.",
    },
    {
      name: "tel",
      label: "Phone Number",
      placeholder: "010-1234-5678",
      description: "Type your phone number here.",
      type: "tel",
    },
    {
      name: "email",
      label: "Email",
      description: "Type your email address here.",
      renderCustomField: renderEmailField,
    },
    {
      name: "birth",
      label: "Date of Birth",
      description: "Type your date of birth here.",
      type: "date",
    },
    {
      name: "password",
      label: "Password",
      description: "Type your password here.",
      type: "password",
    },
  ];

  return (
    <>
      {(isSigningUp || isEmailChecking) && <Loader />}

      <section className="flex w-full h-full">
        {/* Section Left */}
        <div className="flex-1 bg-[#000000] flex items-start justify-center text-step-7">
          <div className="flex flex-col items-start mt-[100px]">
            <span className="text-[#FFFFFF]">Yes, </span>
            <span
              style={{
                WebkitTextStrokeWidth: "1.5px",
                WebkitTextStrokeColor: "#FFFFFF",
              }}
            >
              We create
            </span>
            <span
              style={{
                WebkitTextStrokeWidth: "1.5px",
                WebkitTextStrokeColor: "#FFFFFF",
              }}
            >
              Something
            </span>
            <span className="text-[#FFFFFF]">Creative.</span>
          </div>
        </div>

        {/* Section Right */}
        <main className="flex-1 p-[100px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {formFieldConfig.map((item, index) => (
                <CustomFormField
                  key={index}
                  control={form.control}
                  name={item.name}
                  label={item.label}
                  placeholder={item.placeholder}
                  description={item.description}
                  renderCustomField={item.renderCustomField}
                />
              ))}
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </main>
      </section>
    </>
  );
};

export default Signup;
