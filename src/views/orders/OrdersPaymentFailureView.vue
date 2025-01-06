<template>
  <div>
    Orders Payment Failure View
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import {toast} from "vue3-toastify"

onMounted(() => {
  toast.error("Payment failed!");
})
</script>

