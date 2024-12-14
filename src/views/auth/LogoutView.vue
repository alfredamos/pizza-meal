<template>
  <div>Logout View</div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth.store";
import { useCartItemStore } from "@/stores/cartItem.store";
import { usePizzaStore } from "@/stores/pizza.store";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const cartItemStore = useCartItemStore();
const pizzaStore = usePizzaStore();
const router = useRouter();

onMounted(() => {
  logoutSubmit();
});

const logoutSubmit = () => {
  cartItemStore.removeLocalStorageCartItems();
  pizzaStore.removeLocalStoragePizzas();
  authStore.logout();

  router.push("/");
};
</script>

<style lang="scss" scoped></style>
