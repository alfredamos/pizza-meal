<template>
  <dialog class="modal w-3/4 mx-auto" @click="close" ref="dialogRef">
      <slot></slot>
  </dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const props = defineProps<{isAddToCart: boolean}>();
const emit = defineEmits(['onClose'])
  const  dialogRef= ref<HTMLDialogElement | null>();

  onMounted(() => {
    if (dialogRef.value){
      props.isAddToCart? dialogRef.value.showModal() : dialogRef.value.close()
    }
  })
  

  const close = () =>{
    emit('onClose')
  }
</script>

