import { OrderLineCreate } from "../order-line/order-line-create";

export class OrderCreate {
    numberGuests!: number;
    guestId?: number;
    waiterId?: number;
    orderLines!: OrderLineCreate[];
}
