<template>
  <aside class="w-70 font-semibold mr-6">
    <ul class="flex flex-col gap-y-2 mt-10 text-semibold">
      <li class="mb-8" style="margin-left: 20px; margin-bottom: 60px">
        <RouterLink to="/"
          ><FaHome size="40px" class="text-rose-900 font-extrabold"
        /></RouterLink>
      </li>
      <template v-if="props?.isLoggedIn">
        <li class="mb-8" style="margin-left: 20px; margin-bottom: 60px">
          <RouterLink to="/change-password">
            <FaEdit size="40px" class="text-rose-900 font-extrabold"
          /></RouterLink>
        </li>
        <li class="mb-8" style="margin-left: 20px; margin-bottom: 60px">
          <RouterLink to="/edit-profile">
            <FaUserEdit size="40px" class="text-rose-900 font-extrabold"
          /></RouterLink>
        </li>
      </template>
      <template v-if="props?.isAdmin">
        <li class="mb-8" style="margin-left: 20px; margin-bottom: 60px">
          <RouterLink to="/pizzas">
            <GiFullPizza size="40px" class="text-rose-900 font-extrabold" />
          </RouterLink>
        </li>
        <li class="mb-8" style="margin-left: 20px; margin-bottom: 60px">
          <RouterLink to="/users">
            <FaUsers size="40px" class="text-rose-900 font-extrabold"
          /></RouterLink>
        </li>
      </template>
      <template v-if="props?.isLoggedIn">
        <li class="mb-8" style="margin-left: 20px; margin-bottom: 60px">
          <RouterLink to="/logout">
            <RiLogoutBoxFill size="40px" class="text-rose-900 font-extrabold"
          /></RouterLink>
        </li>
      </template>
      <template v-if="!props?.isLoggedIn">
        <li class="mb-8 mt-48" style="margin-left: 20px; margin-bottom: 60px">
          <RouterLink to="/login">
            <RiLoginBoxLine size="40px" class="text-rose-900 font-extrabold"
          /></RouterLink>
        </li>
        <li class="mb-8 mt-48" style="margin-left: 20px; margin-bottom: 60px">
          <RouterLink to="/signup">
            <SiGnuprivacyguard size="40px" class="text-rose-900 font-extrabold"
          /></RouterLink>
        </li>
      </template>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { FaHome, FaEdit, FaUserEdit, FaUsers } from "vue3-icons/fa";
import { GiFullPizza } from "vue3-icons/gi";
import { RiLoginBoxLine, RiLogoutBoxFill } from "vue3-icons/ri";
import { SiGnuprivacyguard } from "vue3-icons/si";

const props = defineProps<{isAdmin: boolean, isLoggedIn: boolean}>();
</script>

<style lang="scss" scoped></style>
