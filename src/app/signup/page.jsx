"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Card, Form, Input } from "@heroui/react";
import { useRouter } from "next/navigation";
import { GrGoogle } from "react-icons/gr";

export default function SignUpPage() {
  const router = useRouter();
// hee
  const onSubmit = async (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const name = firstName + " " + lastName;

    const image = "";
    const email = e.target.email.value;
    const password = e.target.password.value;
    const phone = e.target.phone.value;

    const { data, error } = await authClient.signUp.email({
      email,
      password,
      image,
      name,
      phone,
    });

    console.log({ data, error });

    if (!error) {
      router.push("/");
    }
  };
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="flex justify-center mt-16 px-4">
      <Card className="w-full max-w-md p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-semibold text-center mb-6">Sign up</h1>

        <Form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Input name="firstName" placeholder="First name" required />

          <Input name="lastName" placeholder="Last name" required />

          <Input name="email" type="email" placeholder="Email" required />

          <Input name="phone" type="text" placeholder="Phone number" />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            required
          />

          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            required
          />

          <Button type="submit" className="w-full bg-blue-600 text-white mt-2">
            Sign Up
          </Button>
        </Form>

        <p className="text-center">Or</p>

        <Button
          onClick={handleGoogleSignIn}
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
          Already have an account?{" "}
          <span
            onClick={() => router.push("/signin")}
            className="text-blue-600 cursor-pointer"
          >
            Log In
          </span>
        </p>
      </Card>
    </div>
  );
}
