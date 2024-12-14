<template>
 <ChangePasswordForm
 @on-back-to-list="backToList"
 @on-submit-form="submitForm"
 :current-user="currentUser"
 />
</template>

<script lang="ts" setup>
import ChangePasswordForm from '@/components/forms/auth/changePassword.form.vue';
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
  await authDbService.changePassword(changePasswordModel);

  router.push("/");
}

</script>
