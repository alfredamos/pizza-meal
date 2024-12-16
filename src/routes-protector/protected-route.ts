import { useAuthStore } from "@/stores/auth.store";
import { storeToRefs } from "pinia";

export function protectedRoute(
  to: any,
  from: any,
  next: (name?: string) => void
) {
  const { isLoggedIn } = storeToRefs(useAuthStore());
  console.log("In protected-route, isLoggedIn : ", isLoggedIn.value);

  if (isLoggedIn.value) {
    next();
  } else {
    next("/must-login");
  }
}
