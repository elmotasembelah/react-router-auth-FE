import { toast } from "sonner";
import { useAuthStore } from "../store/auth";
import axios from "axios";

export default function SignOutButton() {
  const clearUser = useAuthStore((state) => state.clearUser);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/v1/auth/sign-out", null, {
        withCredentials: true,
      });

      clearUser();
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
    >
      Sign Out
    </button>
  );
}
