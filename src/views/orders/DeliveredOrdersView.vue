<template>
  <div
    v-if="!orders.length"
    class="flex justify-center items-center mx-auto my-auto bg-white text-black max-w-lg px-12 py-40 rounded-lg shadow-lg mt-24"
  >
    <h1 class="text-3xl">There are no orders to display!</h1>
  </div>
  <div
    class="overflow-x-auto bg-white m-6 shadow-inner rounded mx-4 p-3"
    v-else
  >
    <table class="table table-zebra border-1 border-gray-200 p-3">
      <thead class="text-gray-200 text-xl bg-gray-500">
        <tr class="">
          <th>Order No.</th>
          <th>Items</th>
          <th>Price</th>
          <th>Quantities</th>
          <th>Date Order</th>
          <th>Status</th>
          <th>Order By</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="text-base text-black"
          v-for="order in orders"
          :key="order.id"
        >
          <td>{{ order.id }}</td>
          <td>
            <ul v-for="item in order?.cartItems" :key="item.id">
              <li>
                <p>{{ item.name }}</p>
              </li>
            </ul>
          </td>

          <td>{{ order.totalPrice }}</td>
          <td>{{ order.totalQuantity }}</td>
          <td>{{ order.orderDate }}</td>
          <td>{{ order.status }}</td>
          <td>{{ order.user?.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useOrderStore } from "@/stores/order.store";
import { orderDbService } from "@/services/orderDb.service";
import { onMounted } from "vue";
import { Status } from "@/models/auth/status.model";

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

