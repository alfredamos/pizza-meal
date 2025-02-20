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
import type { LoginResponse } from "@/models/auth/loginResponse.model";
import type { AuthState } from "@/states/authState";

const authStore = useAuthStore();
const router = useRouter();

const backToList = () => {
  router.back();
};

const submitForm = async (loginModel: LoginModel) => {
  const { data: loginRes } = await authDbService.login(loginModel);

  console.log({loginRes})

  toast.success("Login is successful!");

  //----> Transform the data from loginResponse type to authState type
  const authState = loginDataTransform(loginRes)

  authStore.login(authState);

  router.push("/");
};

const loginDataTransform = (loginRes: LoginResponse): AuthState =>{
  const authState: AuthState = {
    id: loginRes?.authResponse?.id,
    name: loginRes?.authResponse?.name,
    image: loginRes?.authResponse?.image,
    isAdmin: loginRes?.authResponse?.isAdmin,
    isLoggedIn: loginRes?.authResponse?.isLoggedIn,
    role: loginRes?.authResponse?.role,
    token: loginRes?.authResponse?.token,
    currentUser: loginRes?.currentUser
  }
  return authState
}
</script>
