import { Data } from "@angular/router";
import { OrderLineCreate } from "../order-line/order-line-create";

export class OrderUpdate {
    id!: number;
    checkClosingTime?: Data;
    statusOrderId!: number;
    paymentTypeId?: number;
    orderLines!: OrderLineCreate[];
}
