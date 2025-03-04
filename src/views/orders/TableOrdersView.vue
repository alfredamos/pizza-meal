<template>
  <OrdersTableGeneral
    :orders="orders"
    :is-show-action="false"
    :is-show-handlers="false"
  />
</template>

<script lang="ts" setup>
import OrdersTableGeneral from "@/components/orders/OrdersTableGeneral.vue";
import { orderDbService } from "@/services/orderDb.service";
import { useOrderStore } from "@/stores/order.store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const orderStore = useOrderStore();

const { orders } = storeToRefs(orderStore);

onMounted(() => {
  loadOrder();
});

const loadOrder = async () => {
  const { data: orders } = await orderDbService.getAllResources();

  console.log({ orders: orders });

  orderStore.editAllOrders(orders);
};
</script>

