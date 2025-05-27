import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(50, { message: "Username must be less than 50 characters." }),
  email: z.string().email({ message: "Invalid email address" }),
  tel: z
    .string()
    .regex(/^01[016789]-?\d{3,4}-?\d{4}$/, {
      message: "Please enter a valid phone number (e.g., 010-1234-5678)",
    })
    .min(10, { message: "Phone number must be at least 10 digits." })
    .max(13, { message: "Phone number must be less than 13 digits." }),
  birth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Please enter a valid date of birth",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

const Signup = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      tel: "",
      birth: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const handleEmailVerification = () => {
    const email = form.getValues("email");
    if (email) {
      console.log("이메일 인증 요청:", email);
      // 여기에 이메일 인증 로직을 추가할 수 있습니다
    }
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

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        placeholder="example@email.com"
                        {...field}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleEmailVerification}
                        className="whitespace-nowrap"
                      >
                        Verify
                      </Button>
                    </div>
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

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </main>
    </section>
  );
};

export default Signup;
