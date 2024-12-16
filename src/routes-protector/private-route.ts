import { useAuthStore } from "@/stores/auth.store";
import { storeToRefs } from "pinia";

export function privateRoute(
  to: any,
  from: any,
  next: (path?: string) => void
) {
  //----> Get the user-id and check if user is an admin.
  const { isAdmin, currentUser } = storeToRefs(useAuthStore());
  const userId = currentUser.value?.id

  //----> Get the path params.
  const pathArray = location.pathname.split("/");

  //----> Get the user-id param.
  const userIdOrCustomerIdFromRoute = pathArray[pathArray.length - 1];

  //----> Compare the user-id with user param.
  const isSameUser = userId === userIdOrCustomerIdFromRoute;

  //----> Compare the customer-id with customer-id param

  console.log({
    userIdOrCustomerIdFromRoute,
    userId: userId,
  });
  console.log({ isSameUser, isAdmin: isAdmin.value });

  if (isAdmin.value || isSameUser) {
    next();
  } else {
    next("/not-allowed");
  }
}
