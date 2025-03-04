import { Pizza } from "@/models/pizzas/pizza.model";
import { PizzaState } from "@/models/pizzas/pizzaState.model";
import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";

export const usePizzaStore = defineStore("pizza", () => {
  //----> State
  const pizzaState = ref<PizzaState>({ ...new PizzaState() });
  const pizzaDetail = ref<Pizza>(new Pizza())

  //----> Acts like a constructor
  onMounted(() => {
    const pizzas = getLocalStorage<Pizza[]>("pizzas");
    const pizzaDetail = getLocalStorage<Pizza>("pizza")

    if (!!pizzas) {
      pizzaState.value = { ...pizzaState.value, pizzas };

    }
    if (!!pizzaDetail){
      updatePizza(pizzaDetail);
    }
  });


  //----> Getters
  const pizzas = computed(() => pizzaState.value?.pizzas);
  const pizza = computed(() => pizzaDetail.value)

  const addPizza = (pizza: Pizza) => {
    const newPizzas = [...pizzaState.value?.pizzas, pizza];
    pizzaState.value = { ...pizzaState.value, pizzas: newPizzas };

    setLocalStorage<Pizza[]>("pizzas", newPizzas);
  };

  const deletePizza = (pizzaId: string) => {
    const newPizzas = pizzaState.value?.pizzas?.filter(
      (pizza) => pizza.id !== pizzaId
    );
    pizzaState.value = { ...pizzaState.value, pizzas: newPizzas };

    setLocalStorage<Pizza[]>("pizzas", newPizzas);
  };

  const editPizza = (pizzaPayload: Pizza) => {
    const newPizzas = pizzaState.value?.pizzas?.map((pizza) =>
      pizza.id === pizzaPayload.id ? pizzaPayload : pizza
    );
    pizzaState.value = { ...pizzaState.value, pizzas: newPizzas };

    setLocalStorage<Pizza[]>("pizzas", newPizzas);
  };

  const editAllPizzas = (pizzas: Pizza[]) => {
    pizzaState.value = { ...pizzaState.value, pizzas };

    setLocalStorage<Pizza[]>("pizzas", pizzas);
  };

  const updatePizza = (pizza: Pizza)=>{
    pizzaDetail.value = pizza;
    setLocalStorage<Pizza>("pizza", pizza)
  }

  const setLocalStorage = <T>(key: string, resource: T) => {
    localStorage.setItem(key, JSON.stringify(resource));
  };

  const getLocalStorage = <T>(key: string) => {
    return JSON.parse(localStorage.getItem(key)!) as T;
  };

  const removeLocalStorage = (key: string) => {
    localStorage.removeItem(key);
  };

  return {
    addPizza,
    deletePizza,
    editAllPizzas,
    editPizza,
    getLocalStorage,
    pizza,
    pizzas,
    removeLocalStorage,
    setLocalStorage,
    updatePizza
  };
});
