<template>
  <div
    class="bg-white p-12 overflow-y-auto scrollbar max-width-2xl max-h-80 text-black rounded-2xl shadow-2xl"
  >
    <h2 class="font-semibold border-b-2 text-3xl">
      <span>Add To Cart Confirmation</span>
    </h2>
    <template v-for="cart in carts" :key="cart.id">
      <p class="flex justify-between items-center py-2 mt-2">
        <span class="font-light">Product</span>
        <span class="font-semibold">{{ cart.name }}</span>
      </p>
      <p class="flex justify-between items-center py-2 mt-10">
        <span class="font-light">Price </span>
        <span class="font-semibold">${{ cart.price }}</span>
      </p>
      <p class="flex justify-between items-center py-2 mt-2">
        <span class="font-light">Quantity </span>
        <span
          class="flex flex-col gap-4 justify-center items-center font-semibold text-end"
        >
          <button
            type="button"
            class="border border-none text-end"
            @click="quantityIncrease(cart)"
          >
            <FaPlus size="20px" class="text-indigo-500 font-extrabold" />
          </button>

          <span class="text-end">{{ cart.quantity }}</span>

          <button
            type="button"
            class="border border-none text-end"
            @click="quantityDecrease(cart)"
          >
            <FaMinus
              name="heroMinus"
              size="20px"
              class="text-rose-500 font-extrabold"
            />
          </button>
        </span>
      </p>

      <p
        class="flex justify-between items-center py-2 border-t-2 border-b-2 mt-4"
      >
        <span class="font-light">Sub Total</span>
        <span class="font-semibold text-wrap">{{ subTotal(cart) }}</span>
      </p>
    </template>
    <p class="flex justify-between items-center py-2 border-b-2 mt-8">
      <span class="font-light">Total</span>
      <span class="font-semibold text-wrap">{{ totalPrice }}</span>
    </p>
    <div class="flex gap-2 justify-between items-center w-full mt-8">
      <button
        type="button"
        class="flex-1 border-indigo-900 border-2 bg-white text-indigo-900 hover:bg-indigo-900 hover:text-indigo-100 rounded-lg px-2 py-4 font-semibold"
        @click="addToCart(carts)"
      >
        Add To Cart
      </button>
      <button
        type="button"
        class="flex-1 border-rose-900 border-2 bg-white text-rose-900 hover:bg-rose-900 hover:text-rose-100 rounded-lg px-2 py-4 font-semibold"
        @click="backToPizza"
      >
        Back To Pizza
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FaPlus, FaMinus } from "vue3-icons/fa";
import type { CartItem } from "@/models/cartItems/cartItem.model";
import { useCartItemStore } from "@/stores/cartItem.store";
import { storeToRefs } from "pinia";
import { useCartUtilStore } from "@/stores/cartUtil.store";

const cartItemStore = useCartItemStore();
const { cartItems: carts, totalPrice } = storeToRefs(cartItemStore);

const cartUtilStore = useCartUtilStore();

const emit = defineEmits(["onAddToCart"]);

const addToCart = (carts: CartItem[]) => {
  console.log("go back!!!");
  emit("onAddToCart", carts);
};

const backToPizza = () => {
  cartUtilStore.backToPizza();
};

const quantityIncrease = (cart: CartItem) => {
  cartUtilStore.quantityIncrease(cart);
};

const quantityDecrease = (cart: CartItem) => {
  cartUtilStore.quantityDecrease(cart);
};

const subTotal = (cart: CartItem) => {
  return cartUtilStore.subTotal(cart);
};


</script>
