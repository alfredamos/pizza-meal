import type { CartItem } from "@/models/cartItems/cartItem.model";
import type { Pizza } from "@/models/pizzas/pizza.model";
import { useCartItemStore } from "@/stores/cartItem.store";
import { v4 as uuidv4 } from "uuid";


class CartUtilService {
   cartItemStore = useCartItemStore();

  makeCartItems(pizza: Pizza, carts: CartItem[]) {
    const cart = this.findCartItem(pizza, carts)!;

    let cartItem: CartItem | undefined;
    let allCartItems: CartItem[] = [];
    let cartItems: CartItem[] = [...carts];

    if (cart?.quantity > 0) {
      let quantity = Number(cart.quantity);
      cartItem = { ...cart, quantity: quantity + 1 };
      const newCartItems = cartItems?.filter((carte) =>
        carte?.id !== cart?.id ? cartItem : carte
      );
      this.cartItemStore.editCartItem(cartItem);

      allCartItems = [...newCartItems, cartItem];

      return { cartItems: allCartItems };
    } else if (!cart) {
      cartItem = {
        id: uuidv4(),
        name: pizza.name,
        price: pizza.price,
        quantity: 1,
        pizzaId: pizza.id,
        orderId: "",
        image: pizza.image,
      };

      this.cartItemStore.addCartItem(cartItem);

      allCartItems = [...cartItems, cartItem];
    }

    return { cartItems: allCartItems };
  }

  findCartItem(pizza: Pizza, carts: CartItem[]) {
    return carts?.find((cartItem) => cartItem?.pizzaId === pizza.id);
  }

  backToPizza() {
    this.cartItemStore.changeIsAddToCart(false);
  }

  quantityIncrease(cart: CartItem) {
    console.log("Quantity is increased");
    const newCart = {
      ...cart,
      quantity: cart.quantity >= 19 ? 20 : cart.quantity + 1,
    };

    this.cartItemStore.editCartItem(newCart);
  }

  quantityDecrease(cart: CartItem) {
    console.log("Quantity is decreased");

    const newCart = {
      ...cart,
      quantity: cart.quantity <= 1 ? 1 : cart.quantity - 1,
    };
    if (cart?.quantity === 0) this.cartItemStore.deleteCartItem(cart.id);

    if (cart?.quantity > 0) this.cartItemStore.editCartItem(newCart);
  }

  subTotal(cart: CartItem) {
    return cart.quantity * cart.price;
  }

  totalPrice(carts: CartItem[]) {
    return carts?.reduce(
      (sum, current) => sum + current.price * current.quantity,
      0
    );
  }

  totalQuantity(carts: CartItem[]) {
    return carts?.reduce((sum, current) => sum + current.quantity, 0);
  }
}

export const cartUtilService = new CartUtilService();