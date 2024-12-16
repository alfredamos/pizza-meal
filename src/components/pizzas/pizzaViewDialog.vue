<template>
  <ModalAlert :is-add-to-cart="isView">
    <PizzaViewCard
      :pizza="props?.pizza"
      @on-cancel="backToList"
      @click="$event.stopPropagation()"
    />
  </ModalAlert>
</template>

<script lang="ts" setup>
import type { Pizza } from '@/models/pizzas/pizza.model';
import ModalAlert from '@/utils/ModalAlert.vue';
import PizzaViewCard from './pizzaViewCard.vue';

const emit = defineEmits(['onBackToList']);
const props = defineProps<{isView: boolean; pizza: Pizza}>();

const backToList = () =>{
    emit('onBackToList');
  }
</script>

