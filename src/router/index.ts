import { createRouter, createWebHistory } from "vue-router";
import ChangePasswordView from "@/views/auth/ChangePasswordView.vue";
import EditProfileView from "@/views/auth/EditProfileView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import LogoutView from "@/views/auth/LogoutView.vue";
import SignupView from "@/views/auth/SignupView.vue";
import ListPizzaView from "@/views/pizzas/ListPizzaView.vue";
import TableOrdersView from "@/views/orders/TableOrdersView.vue";
import OrdersCartView from "@/views/orders/OrdersCartView.vue";
import OrdersCheckoutView from "@/views/orders/ordersCheckoutView.vue";
import OrdersPaymentFailureView from "@/views/orders/OrdersPaymentFailureView.vue";
import OrdersPaymentSuccessView from "@/views/orders/OrdersPaymentsuccessView.vue";
import OrdersPaymentView from "@/views/orders/OrdersPaymentView.vue";
import DeliveredOrdersView from "@/views/orders/DeliveredOrdersView.vue";
import PendingOrdersView from "@/views/orders/PendingOrdersView.vue";
import ShippedOrdersView from "@/views/orders/ShippedOrdersView.vue";
import OrdersByUserIdView from "@/views/orders/OrdersByUserIdView.vue";
import TablePizzasView from "@/views/pizzas/TablePizzasView.vue";
import NewPizzaView from "@/views/pizzas/NewPizzaView.vue";
import DeletePizzaView from "@/views/pizzas/DeletePizzaView.vue";
import DetailPizzaView from "@/views/pizzas/DetailPizzaView.vue";
import EditPizzaView from "@/views/pizzas/EditPizzaView.vue";
import TableUsersView from "@/views/users/TableUsersView.vue";
import { protectedRoute } from "@/routes-protector/protected-route";
import { adminRoute } from "@/routes-protector/admin-route";
import NewUserView from "@/views/users/NewUserView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/change-password",
      component: ChangePasswordView,
      name: "change-password",
      beforeEnter: [protectedRoute],
    },
    {
      path: "/edit-profile",
      component: EditProfileView,
      name: "edit-profile",
      beforeEnter: [protectedRoute],
    },
    { path: "/login", component: LoginView, name: "login" },
    { path: "/logout", component: LogoutView, name: "logout" },
    { path: "/signup", component: SignupView, name: "signup" },

    {
      path: "/orders",
      component: TableOrdersView,
      name: "orders",
      beforeEnter: [protectedRoute],
    },
    {
      path: "/orders/cart",
      component: OrdersCartView,
      name: "orders-cart",
      beforeEnter: [protectedRoute],
    },
    {
      path: "/orders/checkout",
      component: OrdersCheckoutView,
      name: "orders-checkout",
      beforeEnter: [protectedRoute],
    },
    {
      path: "/orders/payment",
      component: OrdersPaymentView,
      name: "orders-payment",
      beforeEnter: [protectedRoute],
    },
    {
      path: "/orders/payment-success",
      component: OrdersPaymentSuccessView,
      name: "orders-payment-success",
      beforeEnter: [protectedRoute],
    },
    {
      path: "/orders/payment-failure",
      component: OrdersPaymentFailureView,
      name: "orders-payment-failure",
      beforeEnter: [protectedRoute],
    },
    {
      path: "/orders/orders-delivered",
      component: DeliveredOrdersView,
      name: "delivered-orders",
      beforeEnter: [protectedRoute],
    },
    {
      path: "/orders/orders-pending",
      component: PendingOrdersView,
      name: "pending-orders",
      beforeEnter: [protectedRoute],
    },
    {
      path: "/orders/orders-shipped",
      component: ShippedOrdersView,
      name: "shipped-orders",
      beforeEnter: [protectedRoute],
    },
    {
      path: "/orders/orders-by-user-id",
      component: OrdersByUserIdView,
      name: "orders-by-user-id",
      beforeEnter: [protectedRoute],
    },
    { path: "", component: ListPizzaView, name: "home" },
    {
      path: "/pizzas",
      component: TablePizzasView,
      name: "pizzas",
      beforeEnter: [protectedRoute, adminRoute],
    },

    {
      path: "/pizzas/new",
      component: NewPizzaView,
      name: "new-pizza",
      beforeEnter: [protectedRoute, adminRoute],
    },

    {
      path: "/pizzas/:id/edit",
      component: EditPizzaView,
      name: "edit-pizza",
    },
    {
      path: "/pizzas/:id/delete",
      component: DeletePizzaView,
      name: "delete-pizza",
      beforeEnter: [protectedRoute, adminRoute],
    },
    {
      path: "/pizzas/:id/detail",
      component: DetailPizzaView,
      name: "detail-pizza",
      beforeEnter: [protectedRoute, adminRoute],
    },
    {
      path: "/users",
      component: TableUsersView,
      name: "users",
      beforeEnter: [protectedRoute, adminRoute],
    },
    {
      path: "/users/new",
      component: NewUserView,
      name: "new-user",
      beforeEnter: [protectedRoute, adminRoute],
    },
    
  ],
});

export default router;
