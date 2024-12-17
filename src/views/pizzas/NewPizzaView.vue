<template>
  <PizzaForm
    form-name="Create"
    :pizza="pizza"
    @on-cancel="backToList"
    @submit="submitPizza"
  />
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from "uuid";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth.store";
import { usePizzaStore } from "@/stores/pizza.store";
import { useRouter } from "vue-router";
import type { Pizza } from "@/models/pizzas/pizza.model";
import { pizzaDbService } from "@/services/pizzaDb.service";
import PizzaForm from "@/components/forms/pizzas/pizzaForm.vue";

const authStore = useAuthStore();
const pizzaStore = usePizzaStore();

const router = useRouter();

const { currentUser } = storeToRefs(authStore);
const userId = currentUser.value?.id;

const pizza: Pizza = {
  id: uuidv4(),
  name: "",
  price: 0,
  quantity: 0,
  topping: "",
  description: "",
  image: "",
  userId,
};

const backToList = () => {
  router.push("/");
};

const submitPizza = async (pizza: Pizza) => {
  pizza.userId = userId;
  console.log({ inputPizza: pizza });
  //----> Store the new pizza in the database.
  const { data: newPizza } = await pizzaDbService.createResource(pizza);

  console.log({ outputPizza: newPizza });
  //----> Store the new pizza in the client pizza-store.
  pizzaStore.addPizza(newPizza);
  console.log({ newPizza });

  router.push("/");
};
</script>
