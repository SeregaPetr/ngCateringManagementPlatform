import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderRead } from 'src/app/models/order/order-read';
import { SignalrForWaiterService } from 'src/app/services/signalR/signalrForWaiter/signalr-for-waiter.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {

  constructor(private signalRService: SignalrForWaiterService) { }

  ngOnInit(): void {
    this.signalRService.getUnpaidOrders();
    this.signalRService.connect();
  }

  public get unpaidOrders(): OrderRead[] {
    return this.signalRService.unpaidOrders;
  }

  public orderAmount(order: OrderRead): number {
    let sum = 0;
    order.orderLines.forEach(o => {
      sum += o.priceDish * o.countPortions
    });
    return sum;
  }

  public confirmPayment(orderId: number) {
    this.signalRService.confirmPayment(orderId);
  }

  ngOnDestroy(): void {
    this.signalRService.disconnect();
  }
  
}
