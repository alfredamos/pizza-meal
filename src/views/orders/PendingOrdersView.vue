<template>
  <OrdersTableGeneral
    :orders="allOrders"
    :is-deleted="true"
    :is-shipped="true"
    @on-delete-order="onDeleteOrder"
    @on-shipped-order="onShippedOrder"
  />
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useOrderStore } from "@/stores/order.store";
import { onMounted, ref } from "vue";
import type { OrderModel } from "@/models/orders/orderModel.model";
import { orderDbService } from "@/services/orderDb.service";
import { Status } from "@/models/auth/status.model";
import { toast } from "vue3-toastify";
import OrdersTableGeneral from "@/components/orders/OrdersTableGeneral.vue";

const orderStore = useOrderStore();
const { orders } = storeToRefs(orderStore);

const allOrders = ref<OrderModel[]>([]);

onMounted(async() => {
  await loadOrder();
});

const loadOrder = async () => {
  const orders = (await orderDbService.getAllResources())?.data?.filter(
    (order) => order.status === Status.Pending
  );
  console.log({ orders });
  orderStore.changeIsPending(false);
  orderStore.editAllOrders(orders);
  allOrders.value = [...orders];
};

const onShippedOrder = async (orderId: string) => {
  console.log("is-shipped");
  orderStore.changeIsPending(false);

  //----> Updated the order in the database.
  const updatedOrder = (await orderDbService.orderShipped(orderId));
  
  //----> Filter for pending orders.
  allOrders.value = [
    ...orders.value
      ?.map((order) => (order.id === orderId ? updatedOrder : order))
      ?.filter((ord) => ord?.status === Status.Pending),
  ];

  orderStore.editOrder(updatedOrder);

  //-----> Order shipped
  toast.success("Order has been shipped!");

};

const onDeleteOrder = async (orderId: string) => {
  console.log("order-is-deleted");
  await orderDbService.deleteOrder(orderId);

  allOrders.value = [
    ...orders.value?.filter((order) => order.id !== orderId),
  ]?.filter((order) => order.status === Status.Pending);

   orderStore.deleteOrder(orderId);
}
</script>
