<script setup lang="ts">
import { RouterView } from "vue-router";
import NavigationBar from "./utils/NavigationBar.vue";
import SideBar from "./utils/SideBar.vue";
import { useAuthStore } from "./stores/auth.store";
import { storeToRefs } from "pinia";
import { useCartItemStore } from "./stores/cartItem.store";
import { computed, watch, watchEffect } from "vue";

const { isAdmin, isLoggedIn, image, name } = storeToRefs(useAuthStore());
const { totalQuantity } = storeToRefs(useCartItemStore());

console.log("In app-vue : ", {isAdmin: isAdmin.value, isLoggedIn: isLoggedIn.value, image: image.value, name: name.value})
const firstName = computed(() => name.value?.split(" ")[0] ?? "");
</script>

<template>
  <NavigationBar
    :is-admin="isAdmin"
    :is-logged-in="isLoggedIn"
    :total-quantity="totalQuantity"
    :image="image"
    :first-name="firstName"
  />

  <main class="grid grid-cols-12">
    <section class="hidden md:block md:col-span-1 bg-gray-300 min-h-screen">
      <SideBar
        :is-admin="isAdmin"
        :is-logged-in="isLoggedIn"
      />
    </section>
    <section class="col-span-12 md:col-span-11 bg-stone-950 min-h-screen">
      <RouterView />
    </section>
  </main>
</template>
