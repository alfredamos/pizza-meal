import { ApiClientService } from './apiClient.service';
import type { Pizza } from '@/models/pizzas/pizza.model';

class PizzaDbService extends ApiClientService<Pizza> {
  constructor() {
    super('http://localhost:3000/api/pizzas');
  }
}

export const pizzaDbService = new PizzaDbService();
