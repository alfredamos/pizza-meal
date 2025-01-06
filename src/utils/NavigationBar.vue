<template>
  <div
    class="navbar shadow-2xl bg-zinc-100 rounded text-black font-semibold py-4 px-4 mt-2 flex justify-between items-center"
  >
    <div class="mt-6 relative w-full">
      <div
        :class="
          isLoggedIn || totalQuantity === 0
            ? 'btn btn-ghost text-xl absolute -top-10 left-0'
            : 'hidden'
        "
      >
        Pizzeria
        <RouterLink class="flex justify-center item-center" to="/orders/cart">
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
    </div>

    <div class="flex gap-4 text-xl">
      <div class="text-xl flex self-center">{{ firstName }}</div>
      <div class="dropdown dropdown-end">
        <div
          tabindex="0"
          role="button"
          class="btn btn-ghost btn-circle avatar"
          @mouseenter="onOpenDropdown()"
        >
          <img
            class="w-15 h-auto rounded-full object-cover aspect-square"
            alt="Tailwind CSS Navbar component"
            :src="
              !!currentUser
                ? currentUser.image
                : 'Tailwind CSS Navbar component'
            "
          />
        </div>
        <ul
          tabindex="0"
          :class="
            open
              ? 'menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow block'
              : 'hidden'
          "
          @mouseleave="onOpenDropdown()"
        >
          <template v-if="!!isLoggedIn">
            <li>
              <RouterLink to="/change-password">Change Password</RouterLink>
            </li>
            <li><RouterLink to="/edit-profile">Edit Profile</RouterLink></li>
          </template>

          <template v-if="isAdmin">
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

          <template v-if="!!isLoggedIn">
            <li>
              <RouterLink to="/orders/orders-by-user-id">My Orders</RouterLink>
            </li>
            <li><RouterLink to="/logout">Logout</RouterLink></li>
          </template>

          <template v-if="!isLoggedIn">
            <li><RouterLink to="/login">Login</RouterLink></li>
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
  firstName: string;
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
