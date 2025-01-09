import { loadStripe, type Stripe } from "@stripe/stripe-js";
import http from "../interceptor/axios.interceptor";
import type { OrderPayload } from "@/models/orders/orderPayload.model";
import type { Session } from "@/models/stripe/session.model";
import { environment } from "@/environments/environment.dev";
import type { UserPayload } from "@/models/users/userPayload.model";
import type { Pizza } from "@/models/pizzas/pizza.model";

class StripeService {
  stripePromise: Promise<Stripe> | undefined;
  baseUrl = `${environment.apiUrl}/stripe`;
  constructor() {
    this.stripePromise = this.loadStripe();
  }

  async checkout(order: OrderPayload) {
    const stripe = await this.stripePromise;

    const response = await http.post<Session>(
      `${this.baseUrl}/checkout`,
      order
    );

    const session = response?.data;

    const result = await stripe?.redirectToCheckout({
      sessionId: session?.id,
    });

    if (result?.error) {
      console.error(result.error.message);
    }

    return session;
  }

  async getStripeCustomers() {
    const url = `${this.baseUrl}/customers`;
    const response = await http.get<UserPayload[]>(url);

    return response?.data;
  }

  async getStripeProducts() {
    const url = `${this.baseUrl}/products`;
    const response = await http.get<Pizza[]>(url);

    return response?.data;
  }

  private loadStripe(): Promise<Stripe> {
    return loadStripe(environment.stripe_publishable_key!) as Promise<Stripe>;
  }
}

export const stripeService = new StripeService();
