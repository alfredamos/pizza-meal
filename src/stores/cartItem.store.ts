import type { CartItem } from '@/models/cartItems/cartItem.model';
import {  CartItemState } from '@/states/cartItemState';
import { defineStore } from 'pinia'
import { ref, computed } from 'vue';

export const useCartItemStore = defineStore('cartItem', () => {
  //----> State
  const cartItemState = ref<CartItemState>({ ...new CartItemState() });
  
  //----> Getters
  const stateCartItem = computed(() => cartItemState.value);
  const cartItems = computed(() => stateCartItem.value?.cartItems);
  const isAddToCart = computed(() => stateCartItem.value?.isAddToCart);

  //----> Actions
  const addCartItem = (cart: CartItem) =>{
    const newCartItems = [...cartItemState.value?.cartItems, cart];
    
    cartItemState.value = {...cartItemState.value, cartItems: newCartItems}; 

    setLocalStorageCartItems(newCartItems);
  }

  const deleteCartItem = (cartId: string) =>{
    const newCartItems = cartItemState.value?.cartItems?.filter(
      (cart) => cart.id !== cartId
    );
    cartItemState.value = {...cartItemState.value, cartItems: newCartItems}

    setLocalStorageCartItems(newCartItems);
  }

  const editCartItem = (cart: CartItem) => {
    const newCartItems = cartItemState.value?.cartItems?.map((cartItem) =>
      cartItem.id === cart.id ? cart : cartItem
    );
    cartItemState.value = {...cartItemState.value, cartItems: newCartItems}
    
    setLocalStorageCartItems(newCartItems);
  }

  const editAllCatItems = (carts: CartItem[]) => {
    cartItemState.value = {...cartItemState.value, cartItems: carts};

    setLocalStorageCartItems(carts);
  }

  const changeIsAddToCart = (isAddCart: boolean) =>{
    cartItemState.value = {...cartItemState.value, isAddToCart: isAddCart};
  }

  const setLocalStorageCartItems = (carts: CartItem[]) =>{
    localStorage.setItem('carts', JSON.stringify(carts));
  }

  const getLocalStorageCartItems = () => {
    return JSON.parse(localStorage.getItem('carts')!) as CartItem[];
  }

  const removeLocalStorageCartItems = () =>{
    localStorage.removeItem('carts');
  } 
  return { 
    cartItems, 
    changeIsAddToCart,
    getLocalStorageCartItems,
    setLocalStorageCartItems,
    removeLocalStorageCartItems,
    stateCartItem, addCartItem, editAllCatItems, editCartItem, deleteCartItem, isAddToCart }
})



