import { OrderLineRead } from "../order-line/order-line-read";

export class OrderRead {
    id!: number;
    checkOpeningTime!: Date;
    statusOrder!: string;
    numberTable!: number;
    accountId!: string;
    namePaymentType!: string;
    firstNameWaiter!: string;
    lastNameWaiter!: string;
    orderLines!: OrderLineRead[];
}
