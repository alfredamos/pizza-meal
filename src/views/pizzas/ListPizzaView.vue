<template>
  <div
    class="grid grid-cols-1 gap-2 m-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  >
  
    <div
      class="card card-compact bg-base-100 w-full shadow-xl text-stone-700 m-2"
      v-for="pizza in pizzas"
    >
      <figure>
        <img
          :src="pizza.image"
          alt="pizza.name"
          height="80"
          width="80"
          class="object-cover w-full h-48"
        />
      </figure>
      <span class="flex justify-end mr-1 text-rose-900 font-bold hover:text-indigo-900"><RouterLink :to="`/pizzas/detail/${pizza?.id}`" @click="detailPizza(pizza)">Detail</RouterLink></span>
      <div class="card-body">
        <h2 class="card-title">
          <RouterLink :to="`/pizzas/detail/${pizza?.id}`" @click="detailPizza(pizza)">{{pizza.name}}</RouterLink>
        </h2>
        <p>${{ pizza.price }}</p>
        <p>
        <span class="text-muted mr-4">{{isShowMore ? pizza.description : pizza.description.substring(0,40) }}</span>
        <button class="bg-zinc-200 text-indigo-900 py-1 px-2 text-sm rounded-lg flex justify-center items-center hover:bg-indigo-900 hover:text-zinc-200 font-semibold" @click="showMoreText(pizza.id)" type="button">{{isShowMore ? "Less" : "More"}}</button>
      </p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary font-semibold hover:text-indigo-900 hover:bg-zinc-200" @click="addToCart(pizza)">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </div>

  <AddPizzaItem v-if="isAddToCart" @onAddToCart="toCart($event)" />
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { useCartItemStore } from "@/stores/cartItem.store";
import { usePizzaStore } from "@/stores/pizza.store";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { pizzaDbService } from "@/services/pizzaDb.service";
import { onMounted, ref } from "vue";
import { CartItem } from "@/models/cartItems/cartItem.model";
import type { Pizza } from "@/models/pizzas/pizza.model";
import AddPizzaItem from "@/components/pizzas/AddPizzaItem.vue";
import { useCartUtilStore } from "@/stores/cartUtil.store";

//----> State
const isShowMore = ref(false);

//----> Stores and computed parameter
const cartItemStore = useCartItemStore();
const { cartItems, isAddToCart } = storeToRefs(cartItemStore);

const cartUtilStore = useCartUtilStore()

const pizzaStore = usePizzaStore();
const { pizzas } = storeToRefs(pizzaStore);

//----> Composables
const router = useRouter();

//----> Life cycle.
onMounted(async () => {
  await loadPizza();
});

//----> Actions
const loadPizza = async () => {
  const { data: pizzas } = await pizzaDbService.getAllResources();
  pizzaStore.editAllPizzas(pizzas);
};

const addToCart = (pizza: Pizza) => {
  console.log("Add to cart");
  cartItemStore.changeIsAddToCart(true);

  cartUtilStore.makeCartItems(pizza, cartItems.value);
};

const backToList = () => {
  console.log("You must close now!!!");
  cartItemStore.changeIsAddToCart(false);
};

const detailPizza = (pizza: Pizza) => {
  pizzaStore.updatePizza(pizza)
}

const showMoreText = (pizzaId: string) => {
  console.log("pizza-id : ", pizzaId);
  pizzas.value.forEach(pizza =>  {
    if(pizza.id === pizzaId){
      console.log("loop-id : ", pizza.id , " , ", "given-id : ", pizzaId)
      isShowMore.value = !isShowMore.value;
    }
  })
}

const toCart = (carts: CartItem[]) => {
  console.log("The cart-items to cart : ", { carts });

  const newCartItems = carts?.filter((cart) => cart?.quantity !== 0);

  cartItemStore.editAllCatItems(newCartItems);
  cartItemStore.setLocalStorageCartItems(newCartItems);

  console.log({ carts });

  cartItemStore.changeIsAddToCart(false);

  router.push("/orders/cart");
};
</script>

