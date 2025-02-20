<template>
 <ChangePasswordForm
 @on-back-to-list="backToList"
 @on-submit-form="submitForm"
 :current-user="currentUser"
 />
</template>

<script lang="ts" setup>
import {toast} from "vue3-toastify"
import ChangePasswordForm from '@/components/forms/auth/ChangePassword.form.vue';
import type { ChangePasswordModel } from '@/models/auth/changePassword.model';
import { useRouter } from 'vue-router';
import { authDbService } from '../../services/authDb.service';
import { useAuthStore } from "@/stores/auth.store";
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const {currentUser} = storeToRefs(authStore);
const router = useRouter();

const backToList = () => {
  router.back()
}

const submitForm = async(changePasswordModel: ChangePasswordModel) => {
  toast.success("Password change is successful!")
  //----> Store the edited user-payload in the database.
  const userPayload = (await authDbService.changePassword(changePasswordModel))?.data;

  //-----> Store the edited user in the user-store.
  authStore.editCurrentUser(userPayload)
  
  router.push("/");
}


</script>
