<template>
  <div class="overflow-x-auto bg-white m-6 shadow-inner rounded mx-4 p-3">
    <!-- <form @submit.prevent="submitSearch"> -->
     <form> 
      <div class="flex justify-between items-center mb-5 mt-5 w-3/4 mx-auto">
        <input
          type="search"
          name="searchTerm"
          v-model="searchTerm"
          @input="submitSearch"
          class="border-solid border-2 border-gray-300 focus:border-solid focus:border-indigo-600 focus:outline-none text-black w-full rounded-lg p-3"
        />
        <button
          type="button"
          class="bg-blue-900 hover:bg-rose-700 text-blue-200 text-lg font-bold py-3 px-8 rounded-lg mx-4 uppercase"
        >
          Search
        </button>
      </div>
    </form>
    <table class="table table-zebra border-1 border-gray-200 p-3">
      <thead class="text-gray-200 text-xl bg-gray-500">
        <tr class="">
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Description</th>
          <th>Topping</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="text-base text-black"
          v-for="pizza in filteredPizzas"
          :key="pizza.id"
        >
          <td>
            <img
              :src="pizza.image"
              :alt="pizza.name"
              width="80"
              height="80"
              class="object-cover w-20 h-20"
            />
          </td>
         
          <td>{{ pizza.name }}</td>
          <td>{{ pizza.price }}</td>
          <td>{{ pizza.quantity }}</td>
           <td>
        <span class="text-muted mr-4">{{isShowMore ? pizza.description : pizza.description.substring(0,40) }}</span>
        <button class="bg-zinc-200 text-indigo-900 py-1 px-2 text-sm rounded-lg flex justify-center items-center hover:bg-indigo-900 hover:text-zinc-200 font-semibold" @click="showMoreText(pizza.id)" type="button">{{isShowMore ? "Less" : "More"}}</button>
          </td>
          <td>{{ pizza.topping }}</td>
          <td>
            <DeleteViewEditButtonsPizzaTable
              :pizza="pizza"
              :id="pizza.id"
              @on-delete="deletePizza"
              @on-edit="editPizza"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex items-center justify-end my-8">
      <RouterLink
        to="/pizzas/new"
        class="bg-violet-900 text-violet-100 px-12 py-4 rounded-lg uppercase font-bold"
      >
        Add Pizza
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";
import type { Pizza } from "@/models/pizzas/pizza.model";
import { usePizzaStore } from "@/stores/pizza.store";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { pizzaDbService } from "@/services/pizzaDb.service";
import DeleteViewEditButtonsPizzaTable from "@/components/pizzas/DeleteViewEditButtonsPizzaTable.vue";

//----> State
const searchTerm = ref("");
const isShowMore = ref(false);

//----> Stores
const pizzaStore = usePizzaStore();
const { pizzas } = storeToRefs(pizzaStore);

const filteredPizzas = ref<Pizza[]>([]);

//----> Life cycle.
onMounted(() => {
  loadPizza();
});

//----> Actions
const loadPizza = async () => {
  const { data: pizzas } = await pizzaDbService.getAllResources();
  pizzaStore.editAllPizzas(pizzas);
  filteredPizzas.value = [...pizzas];
  console.log("in on-mounted, pizzas : ", pizzas);
};

const showMoreText = (pizzaId: string) => {
  console.log("pizza-id : ", pizzaId);
  pizzas.value.forEach(pizza =>  {
    if(pizza.id === pizzaId){
      console.log("loop-id : ", pizza.id , " , ", "given-id : ", pizzaId)
      isShowMore.value = !isShowMore.value;
    }
  })
}

const submitSearch = async () => {
  const searchedPizzas = pizzas.value?.filter(
    (pizza) =>
      pizza.name.toLowerCase().includes(searchTerm.value?.toLowerCase()) ||
      pizza.description
        .toLowerCase()
        .includes(searchTerm.value?.toLowerCase()) ||
      pizza.topping.toLowerCase().includes(searchTerm.value?.toLowerCase())
  );

  filteredPizzas.value = [...searchedPizzas];
};

const deletePizza = (pizzaId: string) => {
  filteredPizzas.value = pizzas.value?.filter((pizza) => pizza.id !== pizzaId);

  pizzaStore.deletePizza(pizzaId);
};

const editPizza = (updatedPizza: Pizza) => {
  filteredPizzas.value = pizzas.value?.map((pizza) =>
    pizza.id === updatedPizza.id ? updatedPizza : pizza
  );

  pizzaStore.editPizza(updatedPizza);
};
</script>
