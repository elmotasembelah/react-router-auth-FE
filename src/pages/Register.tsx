import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import {
  registerSchema,
  RegisterFormValues,
} from "../lib/validation/register.schema";
import { toast } from "sonner";
import { useAuthStore } from "../store/auth";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });
  const setUser = useAuthStore((state) => state.setUser);

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
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
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration failed, please try again");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Register</h2>

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
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            {...register("name")}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:outline-none"
          />
          <p className="text-sm text-red-500">{errors.name?.message}</p>
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

        <div>
          <label
            htmlFor="passwordConfirmation"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            id="passwordConfirmation"
            type="password"
            {...register("passwordConfirmation")}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:outline-none"
          />
          <p className="text-sm text-red-500">
            {errors.passwordConfirmation?.message}
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
