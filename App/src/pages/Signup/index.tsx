import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { EmailVerification } from "@/components/auth/EmailVerification";
import { useSignup } from "@/hooks/signup/useSignup";
import { signupFormSchema, type SignupFormData } from "@/utils/validation";
import type { SignupData } from "@/types/auth";

const Signup = () => {
  const { handleSignup, isSigningUp } = useSignup();

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
    // if (!isEmailVerified) {
    //   alert("이메일 인증이 필요합니다.");
    //   return;
    // }

    // Transform form data to API format
    const signupData: SignupData = {
      name: values.username,
      email: values.email,
      phoneNumber: values.tel,
      password: values.password,
      birth: values.birth,
    };

    await handleSignup(signupData);
  };

  const handleEmailVerificationComplete = () => {
    // setIsEmailVerified(true);
    console.log("이메일 인증이 완료되었습니다.");
  };

  return (
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
            {/* Name */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email with Verification */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <EmailVerification
                      email={field.value}
                      onVerificationComplete={handleEmailVerificationComplete}
                    />
                  </FormControl>
                  <FormDescription>
                    Type your email address here.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tel */}
            <FormField
              control={form.control}
              name="tel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="010-1234-5678" {...field} />
                  </FormControl>
                  <FormDescription>
                    Type your phone number here.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Birth */}
            <FormField
              control={form.control}
              name="birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>
                    Type your date of birth here.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>Type your password here.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSigningUp} className="w-full">
              {isSigningUp ? "회원가입 중..." : "Submit"}
            </Button>
          </form>
        </Form>
      </main>
    </section>
  );
};

export default Signup;
