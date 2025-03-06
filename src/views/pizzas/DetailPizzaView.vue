<template>
  <div class="flex p-2 min-h-screen text-zinc-300">
  <div class="flex-1 min-h-screen m-4 rounded-3xl">
    <div
    class="card card-compact bg-base-100 w-full shadow-xl text-stone-700 m-2"
  >

    <figure>

      <img
        :src="pizza.image"
        :alt="pizza.name"
        height="500"
        width="500"
        class="object-fit w-full min-h-screen"
      />

    </figure>
<span class="flex justify-end items-center">
    <button type="button" class=" text-rose-900 hover:text-zinc-200 hover:bg-indigo-900 py-1 px-2 text-sm rounded-lg flex justify-center items-center text-muted font-semibold" @click="backToList">Close</button>
  </span>
  </div>
  </div>

<div class="flex-1 my-4 mx-8">
  <div class="flex flex-col">
    <h1 class="text-5xl">{{pizza.name}}</h1>
    <p class="text-xl mt-12">{{pizza.description}}</p>
    <p class="text-xl font-bold mt-12">${{pizza.price }}</p>
    <p class="flex justify-between items-center mt-6 font-bold">
      <RouterLink to="/" class="bg-zinc-400 border border-rose-900 hover:bg-rose-900 hover:text-zinc-200 text-rose-900 px-6 py-2 rounded-lg text-xl">Back</RouterLink>
      <button class="bg-zinc-400 border border-indigo-900 hover:bg-indigo-900 hover:text-zinc-200 text-indigo-900 px-6 py-2 rounded-lg text-xl" @click="addToCart(pizza)">Buy</button>
    </p>


  </div>
</div>
</div>
<AddPizzaItem v-if="isAddToCart" @onAddToCart="toCart($event)" />
</template>

<script lang="ts" setup>
import { useCartItemStore } from '@/stores/cartItem.store';
import { useCartUtilStore } from '@/stores/cartUtil.store';
import { usePizzaStore } from '@/stores/pizza.store';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { pizzaDbService } from '../../services/pizzaDb.service';
import { onMounted } from 'vue';
import AddPizzaItem from "@/components/pizzas/AddPizzaItem.vue";
import type { Pizza } from '@/models/pizzas/pizza.model';
import type { CartItem } from '@/models/cartItems/cartItem.model';

//----> Stores and composables.
  const cartItemStore = useCartItemStore();
  const cartUtil = useCartUtilStore();
  const pizzaStore = usePizzaStore();
  const route = useRoute()
  const router = useRouter()

  //----> Computed values
  const {pizza} = storeToRefs(pizzaStore);
  const {cartItems, isAddToCart} = storeToRefs(cartItemStore)
  
  //----> Life cycle
  onMounted(async () => {
    await loadPizza()
  })

  //----> Actions
  const loadPizza = async () => {
    const pizzaId = route.params?.id as string;
    console.log("pizzaId : ", pizzaId);
    const {data: detailedPizza} = (await pizzaDbService.getOneResource(pizzaId));
    pizzaStore.updatePizza(detailedPizza);
  }

  const addToCart = (pizza: Pizza) => {
      console.log('Add to cart');
      cartItemStore.changeIsAddToCart(true);
      //this.cartUtilService.
      cartUtil.makeCartItems(pizza, cartItems.value)
    }

    const backToList = () => {
      console.log('You must close now!!!');
      cartItemStore.changeIsAddToCart(false);
    }

    const toCart =(carts: CartItem[]) =>{
      console.log('The cart-items to cart : ', { carts });

      const newCartItems = carts?.filter((cart) => cart?.quantity !== 0);

      cartItemStore.editAllCatItems(newCartItems);
      cartItemStore.setLocalStorageCartItems(newCartItems);

      console.log({ carts });

      cartItemStore.changeIsAddToCart(false);

      router.push('/orders/cart');
    }
</script>

<style lang="scss" scoped>


</style>