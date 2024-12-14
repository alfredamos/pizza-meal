import {type Stripe } from '@stripe/stripe-js';
import http from "../interceptor/axios.interceptor"
import type { OrderPayload } from '@/models/orders/orderPayload.model';
import type { Session } from '@/models/stripe/session.model';
import { environment } from '@/environments/environment.dev';

class StripeService {
  stripePromise: Promise<Stripe> | undefined;

  constructor() {
    this.stripePromise = this.loadStripe();
  }

  async checkout(order: OrderPayload) {
    const stripe = await this.stripePromise;

    const response = await http.post<Session>(
      `${environment.apiUrl}/stripe-payment/checkout`,
      order
    );

    const session = response?.data

    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    });

    if (result?.error) {
      console.error(result.error.message);
    }

    return session;
  }

  async redirectToCheckout(orderPayload: OrderPayload): Promise<Stripe> {
    const stripe = await this.stripePromise;

    const response = await fetch(
      `${environment.apiUrl}/stripe-payment/checkout`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      }
    );

    const session = await response.json();

    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    });

    if (result?.error) {
      console.error(result.error.message);
    }

    return session;
  }

  private loadStripe(): Promise<Stripe> {
    return (window as any).Stripe(environment.stripe_publishable_key);
  }
}

export const stripeService = new StripeService();
