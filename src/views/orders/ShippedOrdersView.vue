<template>
  <OrdersTableGeneral
     :orders="allOrders"
     :is-delivered="true"
     @on-delivered-order="onDeliveredOrder"
  />
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useOrderStore } from "@/stores/order.store";
import { onMounted, ref } from "vue";
import type { OrderModel } from "@/models/orders/orderModel.model";
import { orderDbService } from "@/services/orderDb.service";
import { Status } from "@/models/auth/status.model";
import {toast} from "vue3-toastify"
import OrdersTableGeneral from "@/components/orders/OrdersTableGeneral.vue";

const orderStore = useOrderStore();
const { orders } = storeToRefs(orderStore);

const allOrders = ref<OrderModel[]>([]);

onMounted(async () => {
  await loadOrder();
});

const loadOrder = async () => {
  const orders = (await orderDbService.getAllResources())?.data?.filter(
    (order) => order.status === Status.Shipped
  );
  console.log({ orders });
  orderStore.changeIsPending(false);
  
  allOrders.value = [...orders];
  
  orderStore.editAllOrders(orders);
  
};

const onDeliveredOrder = async (orderId: string) => {
  console.log("is-delivered");
  const updatedOrder = (await orderDbService.orderDelivered(orderId));

  allOrders.value = [
    ...orders.value
      ?.map((order) => (order.id === orderId ? updatedOrder : order))
      ?.filter((ord) => ord.status === Status.Shipped),
  ];

  orderStore.editOrder(updatedOrder);

  toast.success("Order has been delivered!");

};
</script>
