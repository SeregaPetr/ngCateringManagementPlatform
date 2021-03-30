import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderLineRead } from 'src/app/models/order-line/order-line-read';
import { OrderLineUpdate } from 'src/app/models/order-line/order-line-update';
import { SignalrForBarService } from 'src/app/services/signalR/signalrForBar/signalr-for-bar.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit, OnDestroy {

  constructor(private signalRService: SignalrForBarService) { }

  ngOnInit(): void {
    this.signalRService.getOrderLinesForBar();
    this.signalRService.connect();
  }

  public get orderLinesForBar() {
    return this.signalRService.orderLinesForBar;
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
