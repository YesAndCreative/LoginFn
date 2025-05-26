import { useState, useEffect } from "react";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Wrapper from "@/components/Wrapper";
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
});

const Signup = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <section className="flex w-full h-full">
      <div className="flex-1 bg-[#000000] p-[40px] flex  items-center justify-center text-step-7">
        <div className="flex flex-col items-start">
          <span className="text-[#FFFFFF]">Yes, </span>
          <span
            style={{
              WebkitTextStrokeWidth: "1px",
              WebkitTextStrokeColor: "#FFFFFF",
            }}
          >
            We create
          </span>
          <span
            style={{
              WebkitTextStrokeWidth: "1px",
              WebkitTextStrokeColor: "#FFFFFF",
            }}
          >
            Something
          </span>
          <span className="text-[#FFFFFF]">Creative.</span>
        </div>
      </div>
      <main className="flex-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </main>
    </section>
  );
};

export default Signup;
