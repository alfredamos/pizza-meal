import type { OrderModel } from "@/models/orders/orderModel.model";
import http from "../interceptor/axios.interceptor"
import { ApiClientService } from "./apiClient.service";

class OrderDbService extends ApiClientService<OrderModel> {
  constructor() {
    super('http://localhost:3000/api/orders');
  }

  async orderDelivered(orderId: string) {
    const url = `${this.baseUrl}/${orderId}/delivered`;
    const response = await http.patch<OrderModel>(url, {});

    return response?.data;
  }
  async orderShipped(orderId: string) {
    const url = `${this.baseUrl}/${orderId}/shipped`;
    const response = await http.patch<OrderModel>(url, {});

    return response?.data;
  }

  async getAllOrdersByUserId(userId: string) {
    const url = `${this.baseUrl}/orders-by-user-id/${userId}`;

    console.log('At point 1, url : ', url);

    const response = await http.get<OrderModel[]>(url);

    console.log('At point 2, orders : ', response);

    return response?.data;
  }

  async deleteOrder(orderId: string){
    const url = `${this.baseUrl}/${orderId}/remove`;
    const response = await http.delete<OrderModel>(url);

    return response?.data;
  }
}

export const orderDbService = new OrderDbService();
