<template>
  <div class="bg-white p-12 max-width-2xl text-black rounded-2xl shadow-2xl">
     <span class="flex justify-end items-center">
    <button type="button" class=" text-rose-900 hover:text-zinc-200 hover:bg-indigo-900 py-1 px-2 text-sm rounded-lg flex justify-center items-center text-muted font-semibold" @click="backToList">Close</button>
  </span> 
  <h2 class="font-semibold border-b-2 text-3xl">
    <span>User Delete Confirmation!</span>
  </h2>
  <p class="flex justify-between items-center py-2 mt-2">
    <span class="font-light">Name</span>
    <span class="font-semibold">{{ props?.user?.name }}</span>
  </p>
  <p class="flex justify-between items-center py-2">
    <span class="font-light">Email </span>
    <span class="font-semibold">{{ props?.user?.email }}</span>
  </p>
  <p class="flex justify-between items-center py-2">
    <span class="font-light">Phone</span>
    <span class="font-semibold">{{ props?.user?.phone }}</span>
  </p>
  <p class="flex justify-between items-center py-2">
    <span class="block mr-6 text-wrap font-light">Address</span>
    <span class="font-semibold w-full text-end">{{ props?.user?.address }}</span>
  </p>
  <p class="flex justify-between items-center py-2">
    <span class="font-light">Gender</span>
    <span class="font-semibold text-wrap">{{ props?.user?.gender }}</span>
  </p>
  <h4 class="mb-4 mt-4 border-b-2 border-t-2 font-semibold py-4 text-xl">
    <span> Do you really want to delete this user? </span>
  </h4>
  <div class="flex justify-between items-center w-full mt-2">
    <button
      type="button"
      class="bg-violet-500 hover:bg-violet-700 text-slate-100 w-full rounded-lg mr-2 font-medium uppercase py-4"
      @click="backToList"
    >
      Cancel
    </button>
    <button
      type="button"
      class="bg-red-500 hover:bg-red-700 text-slate-100 w-full rounded-lg font-medium uppercase py-4"
      @click="deleteUser(user.id)"
    >
      Delete
    </button>
  </div>
  </div>
</template>

<script lang="ts" setup>
import { UserPayload as User } from '@/models/users/userPayload.model';

const props = defineProps<{user: User}>();
const emit = defineEmits(['onBackToList', 'onDelete']);

const backToList = () =>{
    console.log("Back to list!!!")
    emit('onBackToList');
  }

const deleteUser = (userId: string) =>{
    emit('onDelete', userId);
  }
</script>

