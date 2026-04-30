"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Card, Form, Input } from "@heroui/react";
import { useRouter } from "next/navigation";
import { GrGoogle } from "react-icons/gr";

export default function SignInPage() {
  const router = useRouter();


  const onSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    console.log({ data, error });

    if (!error) {
      router.push("/");
    }
  };

  const onGoogleSignIn = async () => {

    await authClient.signIn.social({
        provider: "google",
    })
    
  };

  return (
    <div className="flex justify-center mt-16 px-4">
      <Card className="w-full max-w-md p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-semibold text-center mb-6">Sign In</h1>

        <Form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Input name="email" type="email" placeholder="Email" required />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            required
          />

          <Button type="submit" className="w-full bg-blue-600 text-white mt-2">
            Login
          </Button>
        </Form>

        <p className="text-center">Or</p>

        <Button
          onClick={onGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 
          bg-white text-gray-700 
          border border-gray-200 
          hover:bg-gray-50 
          transition-all duration-200"
        >
          <GrGoogle className="text-[#EA4335] text-lg" />
          Sign in with Google
        </Button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="text-blue-600 cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </Card>
    </div>
  );
}
