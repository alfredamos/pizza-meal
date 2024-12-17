<template>
  <ModalAlert :is-add-to-cart="isView">
    <UserViewCard
      :user="props?.user"
      @on-cancel="backToList"
      @click="$event.stopPropagation()"
    />
  </ModalAlert>
</template>

<script lang="ts" setup>
import { UserPayload as User } from '@/models/users/userPayload.model';
import ModalAlert from '@/utils/ModalAlert.vue';
import UserViewCard from './userViewCard.vue';

const emit = defineEmits(['onBackToList']);
const props = defineProps<{isView: boolean; user: User}>();

const backToList = () =>{
    emit('onBackToList');
  }
</script>

