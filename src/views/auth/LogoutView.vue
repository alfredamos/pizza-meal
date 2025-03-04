<template>
  <div>Logout View</div>
</template>

<script lang="ts" setup>
import { toast } from "vue3-toastify";
import { useAuthStore } from "@/stores/auth.store";
import { useCartItemStore } from "@/stores/cartItem.store";
import { usePizzaStore } from "@/stores/pizza.store";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { authDbService } from '../../services/authDb.service';

const authStore = useAuthStore();
const cartItemStore = useCartItemStore();
const pizzaStore = usePizzaStore();
const router = useRouter();


onMounted(() => {
  logoutSubmit();
});

const logoutSubmit = async() => {
  const response = await authDbService.logout()
  console.log("Logout, response : ", response)
  toast.success("Logout is successful!");
  cartItemStore.removeLocalStorageCartItems();
  pizzaStore.removeLocalStorage("pizzas");
  authStore.logout();

  router.push("/");
};
</script>

<style lang="scss" scoped></style>
