import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Order } from 'src/app/models/order/order';
import { OrderCreate } from 'src/app/models/order/order-create';
import { OrderLineCreate } from 'src/app/models/order-line/order-line-create';
import { ORDER } from '../../menu/menu.component';
import { SignalrForClienService } from 'src/app/services/signalR/signalrForClient/signalr-for-clien.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  public order!: Order;
  public orderAmount!: number;
  public numberGuests!: FormControl;

  constructor(private signalRService: SignalrForClienService) { }

  ngOnInit(): void {
    this.order = this.getOrder();
    this.countTotalOrder();
    
    const numberGuests = localStorage.getItem("numberGuests");
    
    this.numberGuests = new FormControl(numberGuests, [Validators.required, Validators.min(1)]);

    this.signalRService.connect();
}

  public addCounPortions(dishId: number): void {
    this.order.orderLines.forEach(ol=> {
      if(ol.dish.id == dishId) {
        ol.countPortions ++;
      }
    });
    this.countTotalOrder();
    this.saveOrder(this.order);
  }

  public removeCounPortions(dishId: number): void {
    this.order.orderLines.forEach(ol=> {
      if(ol.dish.id == dishId && ol.countPortions > 1) {
          ol.countPortions -- ;
      }
    });
    this.countTotalOrder();
    this.saveOrder(this.order);
  }

  public removeDish(dishId: number):void {
    this.order.orderLines =  this.order.orderLines.filter(item => item.dish.id !== dishId);
    this.countTotalOrder();
    this.saveOrder(this.order);
  }

  public confirmOrder():void {
    console.log("Confirm Order");

    const orderCreate = this.CreateOrder();
   
    this.signalRService.confirmOrder(orderCreate)
      .subscribe(
        () => {
          localStorage.removeItem(ORDER);
          this.order.orderLines = [];
        },
        error => console.log(error)
      );
  }

  private CreateOrder() {
    const orderCreate = new OrderCreate();
    orderCreate.numberGuests = this.numberGuests.value;

    orderCreate.orderLines = [];
    this.order.orderLines.forEach(ol => {
      const orderLineCreate = new OrderLineCreate();
      orderLineCreate.countPortions = ol.countPortions;
      orderLineCreate.dishId = ol.dish.id;

      orderCreate.orderLines.push(orderLineCreate);
    });
    localStorage.setItem("numberGuests", this.numberGuests.value);

    return orderCreate;
  }

  private countTotalOrder() {
    this.orderAmount = 0;
    this.order?.orderLines?.forEach(ol => {
      this.orderAmount += ol.countPortions * ol.dish.price;
    });
  }

  private saveOrder(order: Order) {
    localStorage.setItem(ORDER, JSON.stringify(order));
  }

  private getOrder() {
    const orderTemp = localStorage.getItem(ORDER);
    return orderTemp !== null ? JSON.parse(orderTemp) : new Order();
  }

  ngOnDestroy(): void {
    this.signalRService.disconnect();
  }
}
