<template>
  <LoginForm @on-back-to-list="backToList" @on-submit-form="submitForm" />
</template>

<script lang="ts" setup>
import { toast } from "vue3-toastify";
import LoginForm from "@/components/forms/auth/Login.form.vue";
import type { LoginModel } from "@/models/auth/login.model";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "vue-router";
import { authDbService } from "../../services/authDb.service";

const authStore = useAuthStore();
const router = useRouter();

const backToList = () => {
  router.back();
};

const submitForm = async (loginModel: LoginModel) => {
  const { data: authStateRes } = await authDbService.login(loginModel);

  toast.success("Login is successful!");

  authStore.login(authStateRes);

  router.push("/");
};
</script>
