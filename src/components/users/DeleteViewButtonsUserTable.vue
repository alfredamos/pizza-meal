<template>
  <UserDeleteCatalog
    v-if="isDeleteUser"
    :isDelete="isDeleteUser"
    :user="user"
    @onBackToList="backToList"
    @onDelete="deleteUser"
  /> 
  <UserViewCatalog
    v-if="isViewUser"
    :isView="isViewUser"
    :user="user"
    @onBackToList="backToList()"
  />

  <div class="flex items-center w-full mt-2">
    <button
      type="button"
      class="py-2 px-4 border-2 border-indigo-900 hover:bg-indigo-900 hover:text-indigo-100 text-indigo-900 font-bold text-base rounded-lg mr-2"
      @click="userViewConfirmation"
    >
      view
    </button>
    <button
      type="button"
      class="py-2 px-4 border-2 border-red-900 hover:bg-red-900 hover:text-red-100 text-red-900 font-bold text-base rounded-lg mr-2"
      @click="userDeleteConfirmation"
    >
      Delete
    </button>
  </div>
</template>

<script lang="ts" setup>
import { UserPayload as User } from "@/models/users/userPayload.model";
import { ref } from "vue";
import { userDbService } from "@/services/userDb.service";
import UserDeleteCatalog from "./UserDeleteCatalog.vue";
import UserViewCatalog from "./UserViewCatalog.vue";

const props = defineProps<{ id: string; user: User }>();
console.log("In user-edit-dialog, id : ", props?.id);
const isDeleteUser = ref(false);
const isViewUser = ref(false);
const refresh = ref(false);

const emit = defineEmits(['onEdit', 'onDelete']);

const userDeleteConfirmation = () => {
  isDeleteUser.value = !isDeleteUser.value;
};

const userViewConfirmation = () => {
  console.log("In view, isView : ", isViewUser.value);
  isViewUser.value = !isViewUser.value;
};

const backToList = () => {
  console.log("At point 1", isDeleteUser.value);
  if (isDeleteUser.value) isDeleteUser.value = !isDeleteUser.value;
  if (isViewUser.value) isViewUser.value = !isViewUser.value;
};

const deleteUser = async () => {
  console.log("Please delete me now!!!");
  console.log("user info deleted : ", props?.id);

  await userDbService.deleteResource(props?.id);

  emit('onDelete', props?.id);

  isDeleteUser.value = !isDeleteUser.value;

  refresh.value = !refresh.value;
};
</script>

