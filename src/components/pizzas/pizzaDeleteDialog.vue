<template>
  <ModalAlert :is-add-to-cart="props?.isDelete">
    <pizzaDeleteCard
      @click="$event.stopPropagation()"
      :pizza="props?.pizza"
      @on-back-to-list="backToList"
      @on-delete="deletePizza()"
    />
  </ModalAlert>
</template>

<script lang="ts" setup>
import ModalAlert from "@/utils/ModalAlert.vue";
import pizzaDeleteCard from "./pizzaDeleteCard.vue";
import type { Pizza } from "@/models/pizzas/pizza.model";

const emit = defineEmits(["onBackToList", "onDelete"]);
const props = defineProps<{ isDelete: boolean; pizza: Pizza }>();

const backToList = () => {
  emit("onBackToList");
};

const deletePizza = () => {
  emit("onDelete");
};
</script>
