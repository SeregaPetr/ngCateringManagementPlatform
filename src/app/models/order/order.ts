import { OrderLine } from "../order-line/order-line";

export class Order {
    id!: number;
    numberTable!: number;
    numberGuests!: number;
    orderLines!: OrderLine[];
}
