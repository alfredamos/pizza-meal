<template>
  <main
    @click="$event.stopPropagation()"
    class="max-w-5xl p-6 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500 mt-10 mx-auto"
  >
    <div
      class="bg-white p-8 overflow-y-auto scrollbar max-w-4xl max-h-96 text-black rounded-xl shadow-2xl mx-auto my-auto"
    >
      <h2 class="font-semibold border-b-2 text-3xl">
        <span>Checkout Details</span>
      </h2>
      <template v-for="cart in carts" :key="cart.id">
        <p class="py-2 mt-2">
          <img class="object-cover w-full h-48 rounded-lg" :src="cart.image" />
        </p>
        <p class="flex justify-between items-center py-2 mt-2">
          <span class="font-light">Price </span>
          <span class="font-semibold text-end">${{ cart.price }}</span>
        </p>
        <p class="flex justify-between items-center py-2 mt-2 mb-2">
          <span class="font-light">Quantity </span>
          <span class="font-semibold text-end">{{ cart.quantity }}</span>
        </p>

        <p class="flex justify-between items-center py-2 border-t-2 border-b-2">
          <span class="font-semibold">Sub Total</span>
          <span class="font-semibold text-wrap">{{ subTotal(cart) }}</span>
        </p>
      </template>

      <p class="flex justify-between items-center py-2 border-b-2 mt-8">
        <span class="font-semibold">Total</span>
        <span class="font-semibold text-wrap">{{ totalPrice }}</span>
      </p>
      <div class="flex gap-2 justify-center items-center w-full mt-8">
        <button
          type="button"
          class="border-indigo-900 border-2 bg-white text-indigo-900 hover:bg-indigo-900 hover:text-indigo-100 rounded-lg px-2 py-4 font-semibold w-1/2 flex justify-center items-center"
          @click="initiateStripe"
        >
          Pay
        </button>
        <RouterLink
          type="button"
          to="/orders/checkout"
          class="border-rose-900 border-2 bg-white text-rose-900 hover:bg-rose-900 hover:text-rose-100 rounded-lg px-2 py-4 font-semibold w-1/2 flex justify-center items-center"
        >
          Back To Checkout
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth.store";
import { useCartItemStore } from "@/stores/cartItem.store";
import { useCartUtilStore } from "@/stores/cartUtil.store";
import { computed } from "vue";
import type { CartItem } from "@/models/cartItems/cartItem.model";
import { stripeService } from "@/services/stripePay.service";
import { toast } from "vue3-toastify";

const authStore = useAuthStore();
const cartItemStore = useCartItemStore();
const cartUtilStore = useCartUtilStore();

const { cartItems: carts } = storeToRefs(cartItemStore);

const { currentUser } = storeToRefs(authStore);
const userId = currentUser.value?.id;

const totalPrice = computed(() => cartItemStore.totalPrice);

const initiateStripe = async() => {
  const orderPayload = cartUtilStore.makeOrder(userId, carts.value);
  await stripeService.checkout(orderPayload);
  //----> Items payment initiated.
  toast.success("Items payment initiated!")
};

const subTotal = (cart: CartItem) => {
  //----> Get the total
  return cartUtilStore.subTotal(cart);
};
</script>

