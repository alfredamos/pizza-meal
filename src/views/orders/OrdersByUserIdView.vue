<template>
  <OrdersTableGeneral
    :orders="orders"
    :is-show-action="false"
    :is-show-handlers="false"
  />
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth.store";
import { useOrderStore } from "@/stores/order.store";
import { orderDbService } from "@/services/orderDb.service";
import { onMounted } from "vue";
import OrdersTableGeneral from "@/components/orders/OrdersTableGeneral.vue";

const authStore = useAuthStore();
const orderStore = useOrderStore();

const { id } = storeToRefs(authStore);
const userId = id.value;

const { orders } = storeToRefs(orderStore);

onMounted(() => {
  loadOrder();
});

const loadOrder = async () => {
  const orders  = await orderDbService.getAllOrdersByUserId(userId);

  console.log({ userId, orders: orders });

  orderStore.editAllOrders(orders);
};
</script>

