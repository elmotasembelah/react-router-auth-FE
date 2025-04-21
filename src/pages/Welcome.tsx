import SignOutButton from "../components/SignOutButton";
import { useAuthStore } from "../store/auth";

export default function Welcome() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-semibold text-blue-600">
        Welcome to the application, {user?.name}
      </h1>
      <p className="text-gray-700 mt-2">You're now logged in.</p>
      <SignOutButton />
    </div>
  );
}
