<template>
  <ModalAlert @on-close="backToList" :isAddToCart="isAddToCart">
    <AddPizzaToCart
      v-if="isAddToCart"
      @onAddToCart="addToCart($event)"
      @click="$event.stopPropagation()"
    />
  </ModalAlert>
</template>

<script lang="ts" setup>
import type { CartItem } from "@/models/cartItems/cartItem.model";
import { useCartItemStore } from "@/stores/cartItem.store";
import { storeToRefs } from "pinia";
import AddPizzaToCart from "./AddPizzaToCart.vue";
import ModalAlert from "@/utils/ModalAlert.vue";

const cartItemStore = useCartItemStore();
const { isAddToCart } = storeToRefs(cartItemStore);

const emit = defineEmits(["onAddToCart"]);

const addToCart = (carts: CartItem[]) => {
  emit("onAddToCart", carts);
};

const backToList = () => {
  cartItemStore.changeIsAddToCart(false);
};
</script>
