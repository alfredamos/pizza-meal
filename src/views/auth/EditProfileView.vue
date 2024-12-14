<template>
  <EditProfileForm
  :current-user="currentUser"
  @on-back-to-list="backToList"
  @on-submit-form="submitForm"
  />
</template>

<script lang="ts" setup>
import EditProfileForm from '@/components/forms/auth/EditProfile.form.vue';
import type { EditProfileModel } from '@/models/auth/editProfile.model';
import { authDbService } from '@/services/authDb.service';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const currentUser = authStore.currentUser

const backToList = () => {
  router.back();
}

const submitForm = async (editProfileModel: EditProfileModel) => {
  await authDbService.editProfile(editProfileModel);

  router.push("/")
}

</script>

<style lang="scss" scoped>


</style>