import type { OrderModel } from "./orderModel.model";

export class OrdersTableProps{
  orders!: OrderModel[];
  isDelivered?: boolean = false;
  isDeleted?: boolean = false;
  isShipped?: boolean = false;
  isShowAction?: boolean = true;
  isShowHandlers?: boolean = true;
}
