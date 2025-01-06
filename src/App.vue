<script setup lang="ts">
import { RouterView } from "vue-router";
import NavigationBar from "./utils/NavigationBar.vue";
import SideBar from "./utils/SideBar.vue";
import { useAuthStore } from "./stores/auth.store";
import { storeToRefs } from "pinia";
import { useCartItemStore } from "./stores/cartItem.store";
import { computed } from "vue";

const { currentUser, isAdmin, isLoggedIn } = storeToRefs(useAuthStore());

const { cartItems } = storeToRefs(useCartItemStore());

const firstName = computed(() => currentUser.value?.name?.split(" ")[0] ?? "");
</script>

<template>
  <NavigationBar
    :current-user="currentUser"
    :is-admin="isAdmin"
    :is-logged-in="isLoggedIn"
    :cart-items="cartItems"
    :first-name="firstName"
  />

  <main class="grid grid-cols-12">
    <section class="hidden md:block md:col-span-1 bg-gray-300 min-h-screen">
      <SideBar
        :current-user="currentUser"
        :is-admin="isAdmin"
        :is-logged-in="isLoggedIn"
      />
    </section>
    <section class="col-span-12 md:col-span-11 bg-stone-950 min-h-screen">
      <RouterView />
    </section>
  </main>
</template>
