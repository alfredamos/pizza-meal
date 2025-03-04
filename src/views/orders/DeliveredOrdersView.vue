<template>
  <OrdersTableGeneral
    :orders="orders"
    :is-show-action="false"
    :is-show-handlers="false"
  />
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useOrderStore } from "@/stores/order.store";
import { orderDbService } from "@/services/orderDb.service";
import { onMounted } from "vue";
import { Status } from "@/models/auth/status.model";
import OrdersTableGeneral from "@/components/orders/OrdersTableGeneral.vue";

const orderStore = useOrderStore();

const { orders } = storeToRefs(orderStore);

onMounted(() => {
  loadOrder();
});

const loadOrder = async () => {
  const orders = (await orderDbService.getAllResources())?.data?.filter(
    (order) => order.status === Status.Delivered
  );

  console.log({ orders: orders });

  orderStore.editAllOrders(orders);
};
</script>

