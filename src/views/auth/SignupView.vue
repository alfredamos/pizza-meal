<template>
  <signupForm
    @on-back-to-list="backToList"
    @on-submit-form="submitForm"
  />
</template>

<script lang="ts" setup>
import signupForm from '@/components/forms/auth/signup.form.vue';
import { useRouter } from 'vue-router';
import { authDbService } from '../../services/authDb.service';
import type { SignupModel } from '@/models/auth/signup.model';

const router = useRouter();

const backToList = () =>{
  router.back();
}

const submitForm = async(signupModel: SignupModel) =>{
  await authDbService.signup(signupModel);

  router.push("/");
}
</script>

<style lang="scss" scoped>


</style>