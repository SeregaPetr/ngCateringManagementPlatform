import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderLineRead } from 'src/app/models/order-line/order-line-read';
import { OrderLineUpdate } from 'src/app/models/order-line/order-line-update';
import { SignalrForWaiterService } from 'src/app/services/signalR/signalrForWaiter/signalr-for-waiter.service';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.scss']
})
export class WaiterComponent implements OnInit, OnDestroy {

  constructor(private signalRService: SignalrForWaiterService) { }

  ngOnInit(): void {
    this.signalRService.getOrderLinesForWaiter();
    this.signalRService.connect();
  }

  public get orderLinesForWaiter(): OrderLineRead[] {
    return this.signalRService.orderLinesForWaiter;
  }

  public takeOrder(orderLineRead: OrderLineRead) {
    const orderLineUpdate= new OrderLineUpdate(); 
    orderLineUpdate.id = orderLineRead.id;
    orderLineUpdate.nameStatus = orderLineRead.nameStatus;

    this.signalRService.updateOrderLine(orderLineUpdate);
  }
  
  ngOnDestroy(): void {
    this.signalRService.disconnect();
  }

}
