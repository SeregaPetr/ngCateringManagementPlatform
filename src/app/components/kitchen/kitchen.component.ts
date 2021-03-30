import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderLineRead } from 'src/app/models/order-line/order-line-read';
import { OrderLineUpdate } from 'src/app/models/order-line/order-line-update';
import { SignalrForKitchenService } from 'src/app/services/signalR/signalrForKitchen/signalr-for-kitchen.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.scss']
})
export class KitchenComponent implements OnInit, OnDestroy {

  constructor(private signalRService: SignalrForKitchenService) { }

  ngOnInit(): void {
    this.signalRService.getOrderLinesForKitchen();
    this.signalRService.connect();
  }

  public get orderLinesForKitchen(): OrderLineRead[] {
    return this.signalRService.orderLinesForKitchen;
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
