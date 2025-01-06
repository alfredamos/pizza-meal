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
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'vue-router';
import { authDbService } from '../../services/authDb.service';


const authStore = useAuthStore();
const currentUser = authStore.currentUser;

const router = useRouter();

const backToList = () => {
  router.back()
}

const submitForm = async(changePasswordModel: ChangePasswordModel) => {
  toast.success("Password change is successful!")
  await authDbService.changePassword(changePasswordModel);
  router.push("/");
}

</script>
