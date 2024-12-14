import type { OrderModel } from "@/models/orders/orderModel.model";
import http from "../interceptor/axios.interceptor"
import { ApiClientService } from "./apiClient.service";

class OrderDbService extends ApiClientService<OrderModel> {
  constructor() {
    super('http://localhost:5000/api/orders');
  }

  async orderDelivered(orderId: string) {
    const url = `${this.baseUrl}/delivered/${orderId}`;
    const response = await http.patch<OrderModel>(url, {});

    return response;
  }
  async orderShipped(orderId: string) {
    const url = `${this.baseUrl}/shipped/${orderId}`;
    const response = await http.patch<OrderModel>(url, {});

    return response;
  }

  async getAllOrdersByUserId(userId: string) {
    const url = `${this.baseUrl}/orders-by-user-id/${userId}`;

    const response = await http.get<OrderModel[]>(url);

    return response;
  }
}

export const orderDbService = new OrderDbService();
