import { Injectable } from '@angular/core';
import { OrderLineRead } from 'src/app/models/order-line/order-line-read';
import { OrderLineUpdate } from 'src/app/models/order-line/order-line-update';
import { SignalrService } from '../signalr.service';

@Injectable({
  providedIn: 'root'
})
export class SignalrForBarService extends SignalrService {
  public orderLinesForBar!: OrderLineRead[];

  public addListeners(): void {
    this.hubConnection.on("sentToBar", (data: OrderLineRead[]) => {
      console.log("Data received for bar");
      this.orderLinesForBar = data;
    });
  } 

  public getOrderLinesForBar() {
    this.http.get<OrderLineRead[]>(`${this.platformUrl}order-lines-for-bar`)
      .subscribe(
        data => this.orderLinesForBar = data,
        error => console.log(error)
      );
  }
  
  public updateOrderLine(orderLineUpdate: OrderLineUpdate) {
    super.updateOrderLine(orderLineUpdate);
  }
}
