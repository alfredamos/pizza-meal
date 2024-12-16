<template>
  <PizzaDeleteDialog
    v-if="isDeletePizza"
    :isDelete="isDeletePizza"
    :pizza="pizza"
    @onBackToList="backToList"
    @onDelete="deletePizza"
  />
  <PizzaEditDialog
    v-if="isEditPizza"
    :isEdit="isEditPizza"
    :pizza="pizza"
    @onBackToList="backToList"
    @onEdit="editPizza"
  />
  <PizzaViewDialog
    v-if="isViewPizza"
    :isView="isViewPizza"
    :pizza="pizza"
    @onBackToList="backToList()"
  />

  <div class="flex items-center w-full mt-2">
    <button
      type="button"
      class="py-2 px-4 border-2 border-violet-900 hover:bg-violet-900 hover:text-indigo-100 text-violet-900 font-bold text-base rounded-lg mr-2"
      @click="pizzaViewConfirmation"
    >
      view
    </button>

    <button
      type="button"
      class="py-2 px-4 border-2 border-rose-900 hover:bg-rose-900 hover:text-rose-100 text-rose-900 font-bold text-base rounded-lg mr-2"
      @click="pizzaDeleteConfirmation"
    >
      Delete
    </button>
    <button
      type="button"
      class="py-2 px-4 border-2 border-yellow-500 hover:bg-orange-400 hover:text-yellow-100 text-orange-400 font-bold text-base rounded-lg mr-2"
      @click="pizzaEditConfirmation"
    >
      Edit
    </button>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import type { Pizza } from "@/models/pizzas/pizza.model";
import { useAuthStore } from "@/stores/auth.store";
import { ref } from "vue";
import { pizzaDbService } from "@/services/pizzaDb.service";
import PizzaDeleteDialog from "./pizzaDeleteDialog.vue";
import PizzaEditDialog from "./pizzaEditDialog.vue";
import PizzaViewDialog from "./pizzaViewDialog.vue";

const props = defineProps<{ id: string; pizza: Pizza }>();

const isDeletePizza = ref(false);
const isEditPizza = ref(false);
const isViewPizza = ref(false);
const refresh = ref(false);

const authStore = useAuthStore();

const { currentUser } = storeToRefs(authStore);

const userId = currentUser.value?.id;

const pizzaDeleteConfirmation = () => {
  isDeletePizza.value = !isDeletePizza.value;
};

const pizzaEditConfirmation = () => {
  isEditPizza.value = !isEditPizza.value;
};

const pizzaViewConfirmation = () => {
  console.log("In view, isView : ", isViewPizza.value);
  isViewPizza.value = !isViewPizza.value;
};

const editPizza = async (pizza: Pizza) => {
  console.log("Please edit me now!!!");
  pizza.userId = userId;
  console.log("pizza info edited : ", pizza);

  await pizzaDbService.editResource(props?.id, pizza);

  isEditPizza.value = !isEditPizza.value;

  refresh.value = !refresh.value;
};

const backToList = () => {
  console.log("At point 1", isDeletePizza.value);
  if (isDeletePizza.value) isDeletePizza.value = !isDeletePizza.value;
  if (isEditPizza.value) isEditPizza.value = !isEditPizza.value;
  if (isViewPizza.value) isViewPizza.value = !isViewPizza.value;
};

const deletePizza = async (id: string) => {
  console.log("Please delete me now!!!");
  console.log("pizza info deleted : ", id);

  await pizzaDbService.deleteResource(id);

  isDeletePizza.value = !isDeletePizza.value;

  refresh.value = !refresh.value;
};
</script>
