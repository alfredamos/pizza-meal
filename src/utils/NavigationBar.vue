<template>
  <div
    class="navbar shadow-2xl bg-zinc-100 rounded text-black font-semibold py-4 px-4 mt-2 relative flex justify-between items-center"
  >
    <div
      :class="
        props?.isLoggedIn || totalQuantity === 0
          ? 'flex items-center mt-4 absolute top-0 right-0'
          : 'hidden'
      "
    >
      <RouterLink
        class="btn btn-ghost text-xl flex justify-center item-center"
        to="/orders/cart"
        >Pizza-Order
        <span
          :class="
            totalQuantity
              ? 'inline-block bg-rose-900 text-rose-100 rounded-full py-1 px-3'
              : 'undefined'
          "
        >
          {{ totalQuantity ? totalQuantity : undefined }}
        </span></RouterLink
      >
    </div>
    <div class="flex gap-4">
      <span
        class="font-semibold flex justify-center item-center text-xl mb-2"
        >{{ props?.currentUser?.name }}</span
      >
      <div class="dropdown dropdown-end">
        <div
          tabindex="0"
          role="button"
          class="btn btn-ghost btn-circle avatar"
          @mouseenter="onOpenDropdown"
        >
          <div class="w-15 rounded-full object-cover">
            <img
              alt="Tailwind CSS Navbar component"
              :src="
                !!props?.currentUser
                  ? props?.currentUser?.image
                  : 'Tailwind CSS Navbar component'
              "
            />
          </div>
        </div>
        <ul
          tabindex="0"
          :class="
            open
              ? 'menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow block'
              : 'hidden'
          "
          @mouseleave="onOpenDropdown"
        >
          <template v-if="props?.isLoggedIn">
            <li>
              <RouterLink to="/change-password">Change Password</RouterLink>
            </li>
            <li><RouterLink to="/edit-profile">Edit Profile</RouterLink></li>
          </template>
          <template v-if="props?.isAdmin">
            <li><RouterLink to="/orders">All Orders</RouterLink></li>
            <li>
              <RouterLink to="/orders/orders-delivered"
                >Delivered Orders</RouterLink
              >
            </li>
            <li>
              <RouterLink to="/orders/orders-pending"
                >Pending Orders</RouterLink
              >
            </li>
            <li>
              <RouterLink to="/orders/orders-shipped"
                >Shipped Orders</RouterLink
              >
            </li>
            <li><RouterLink to="/pizzas">Pizzas</RouterLink></li>
            <li><RouterLink to="/users">Users</RouterLink></li>
          </template>
          <template v-if="props?.isLoggedIn">
            <li>
              <RouterLink to="/orders/orders-by-user-id">My Orders</RouterLink>
            </li>
            <li><RouterLink to="/logout">Logout</RouterLink></li>
          </template>
          <template v-if="!props?.isLoggedIn">
            <li>
              <RouterLink to="/login">Login</RouterLink>
            </li>
            <li><RouterLink to="/signup">Signup</RouterLink></li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import type { UserResponseModel } from "@/models/users/userResponse.model";
import type { CartItem } from "@/models/cartItems/cartItem.model";

const props = defineProps<{
  cartItems: CartItem[];
  currentUser: UserResponseModel;
  isAdmin: boolean;
  isLoggedIn: boolean;
}>();

const open = ref(true);

const totalQuantity = computed(() =>
  props?.cartItems?.reduce((sum, current) => sum + current.quantity, 0)
);

const totalPrice = computed(() =>
  props?.cartItems?.reduce(
    (sum, current) => sum + current.quantity * current.price,
    0
  )
);

const onOpenDropdown = () => {
  console.log("In-navbar!!!");
  open.value = !open.value;

  console.log("open : ", open.value);
};
</script>

<style lang="scss" scoped></style>
