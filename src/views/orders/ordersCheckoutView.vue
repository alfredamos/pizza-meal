<template>
  <div
    v-if="!carts.length"
    class="bg-white p-12 shadow-xl rounded-lg text-indigo-500 max-w-md flex justify-center items-center font-bold mx-auto mt-96 text-4xl"
  >
    No order to display
  </div>
  <div
    v-else
    @click="$event.stopPropagation()"
    class="bg-white p-12 overflow-y-auto scrollbar max-w-2xl max-h-80 text-black rounded-xl shadow-2xl mx-auto mt-20"
  >
    <h2 class="font-semibold border-b-2 text-3xl">
      <span>Checkout Details</span>
    </h2>
    <template v-for="cart in carts" :key="cart.id">
      <p class="flex justify-between items-center py-2 mt-2">
        <span class="font-light">Product</span>
        <span class="font-semibold text-end">{{ cart.name }}</span>
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
      <span class="font-semibold text-wrap">{{ total() }}</span>
    </p>
    <div class="flex gap-2 justify-center items-center w-full mt-8">
      <button
        type="button"
        class="border-indigo-900 border-2 bg-white text-indigo-900 hover:bg-indigo-900 hover:text-indigo-100 rounded-lg px-2 py-4 font-semibold w-1/2 flex justify-center items-center"
        @click="makePayment"
      >
        Make Payment
      </button>
      <button
        type="button"
        @click="backToCart"
        class="border-rose-900 border-2 bg-white text-rose-900 hover:bg-rose-900 hover:text-rose-100 rounded-lg px-2 py-4 font-semibold w-1/2 flex justify-center items-center"
      >
        Back To Cart
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCartItemStore } from "@/stores/cartItem.store";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useCartUtilStore } from "@/stores/cartUtil.store";
import type { CartItem } from "@/models/cartItems/cartItem.model";
import {toast} from "vue3-toastify"

//---> stores
const cartUtilStore = useCartUtilStore();
const cartItemStore = useCartItemStore();
const router = useRouter();

const { cartItems: carts } = storeToRefs(cartItemStore);

const makePayment = () => {
  //----> Items sent to checkout
  toast.success("Items have been successfully checked out!")
  cartItemStore.editAllCatItems(carts.value);
  
  router.push("/orders/payment");
};

const backToCart = () => {
  router.push("/orders/cart");
};

const subTotal = (cart: CartItem) => {
  return cartUtilStore.subTotal(cart);
};

const total = () => {
  return cartItemStore.totalPrice;
};
</script>
