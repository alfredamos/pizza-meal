<template>
  <pizzaForm
    :form-name="props?.formName"
    :pizza="props?.pizza"
    @on-cancel="backToList"
    @submit="editPizza"
  />
</template>

<script lang="ts" setup>
import pizzaForm from '../forms/pizzas/pizzaForm.vue';
import type { Pizza } from '@/models/pizzas/pizza.model';

const props = defineProps<{formName: string; pizza: Pizza}>();
const emit = defineEmits(['onCancel', 'onEdit']);

const backToList = () =>{
    emit('onCancel');
  }

const editPizza =(pizza: Pizza) =>{
    emit('onEdit', pizza);
  }
</script>

