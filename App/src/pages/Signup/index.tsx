import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Loader from "@/components/common/Loader";
import { signupFormSchema, type SignupFormData } from "@/lib/signup/validation";
import CustomFormField from "@/components/common/CustomFormField";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ICustomFormField } from "@/types/signup/auth";

import useSignup from "@/hooks/signup/useSignup";
import useEmailCheck from "@/hooks/signup/useEmailCheck";

const Signup = () => {
  const { handleSignup, isSigningUp, signupError } = useSignup();
  const { handleEmailCheck, isEmailChecking, emailCheckError } =
    useEmailCheck();

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

  const onEmailCheck = async () => {
    const isEmailValid = await form.trigger("email");
    if (isEmailValid) {
      const email = form.getValues("email");

      const success = await handleEmailCheck({ email });

      console.log("success :", success);
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
              Verify
            </Button>
          </div>
          <FormDescription>{description}</FormDescription>
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
      {isSigningUp && <Loader />}

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
