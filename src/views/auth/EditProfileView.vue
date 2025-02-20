<template>
  <EditProfileForm
  :current-user="currentUser"
  @on-back-to-list="backToList"
  @on-submit-form="submitForm"
  />
</template>

<script lang="ts" setup>
import {toast} from "vue3-toastify"
import EditProfileForm from '@/components/forms/auth/EditProfile.form.vue';
import { EditProfileModel } from '@/models/auth/editProfile.model';
import { authDbService } from '@/services/authDb.service';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth.store';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore()
const {currentUser} = storeToRefs(authStore);
const router = useRouter();

const backToList = () => {
  router.back();
}

const submitForm = async (editProfileModel: EditProfileModel) => {
  toast.success("Profile is changed successfully!")
  
  //----> Store the edited user in the database.
  const userPayload = (await authDbService.editProfile(editProfileModel))?.data;

  //-----> Store the edited user in the user-store.
  authStore.editCurrentUser(userPayload)

  router.push("/")
}

</script>

<style lang="scss" scoped>


</style>