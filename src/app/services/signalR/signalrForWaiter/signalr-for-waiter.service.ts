import { Injectable } from '@angular/core';
import { OrderLineRead } from 'src/app/models/order-line/order-line-read';
import { OrderLineUpdate } from 'src/app/models/order-line/order-line-update';
import { OrderRead } from 'src/app/models/order/order-read';
import { SignalrService } from '../signalr.service';

@Injectable({
  providedIn: 'root'
})
export class SignalrForWaiterService extends SignalrService{
  public orderLinesForWaiter!: OrderLineRead[];
  public unpaidOrders!: OrderRead[];


  public addListeners(): void {
    this.hubConnection.on("sentToWaiter", (data: OrderLineRead[]) => {
      console.log("Data received for waite")
      this.orderLinesForWaiter = data;
    });

    this.hubConnection.on("sentOrdersForWaiter", (data: OrderRead[]) => {
      console.log(data)
      console.log("Orders for waite")

      this.unpaidOrders = data;
    });
  }

  public getOrderLinesForWaiter() {
    this.http.get<OrderLineRead[]>(`${this.platformUrl}order-lines-for-waiter`)
      .subscribe(
        data => this.orderLinesForWaiter = data,
        error => console.log(error)
      );
  }

  public updateOrderLine(orderLineUpdate: OrderLineUpdate) {
    super.updateOrderLine(orderLineUpdate);
  }

  public getUnpaidOrders() {
    this.http.get<OrderRead[]>(`${this.platformUrl}unpaid-orders`)
      .subscribe(
        data => this.unpaidOrders = data,
        error => console.log(error)
      );
  }

  public confirmPayment(orderId: number) {
    this.http.put(`${this.platformUrl}confirm-payment/${orderId}`, null)
      .subscribe( 
        ()=> console.log("Сonfirm Payment"),
        error => console.log(error)
      );
  }

}
