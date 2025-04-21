import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signInSchema,
  SignInFormValues,
} from "../lib/validation/sign-in.schema";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function SignIn() {
  const [errorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const onSubmit = async (data: SignInFormValues) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/sign-in",
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const user = response.data.user;

      setUser({
        id: user._id,
        email: user.email,
        name: user.name,
      });
      navigate("/");
      toast.success("Logged in successfully");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message ?? "Something went wrong";

        if (status === 401) {
          toast.error("Invalid email or password");
        } else if (status === 400) {
          toast.error(`Bad request: ${message}`);
        } else if (status === 500) {
          toast.error("Server error, please try again later");
        } else {
          toast.error(message);
        }
      } else if (error.request) {
        toast.error("No response from server. Check your connection.");
      } else {
        toast.error("Unexpected error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Sign In</h2>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:outline-none"
          />
          <p className="text-sm text-red-500">{errors.email?.message}</p>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:outline-none"
          />
          <p className="text-sm text-red-500">{errors.password?.message}</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
        <div className="text-center">
          <p className="text-sm">
            Don’t have an account?{" "}
            <button
              type="button"
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate("/registers")}
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
