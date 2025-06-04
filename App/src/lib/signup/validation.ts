import { z } from "zod";

export const signupFormSchema = z.object({
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

export type SignupFormData = z.infer<typeof signupFormSchema>;
