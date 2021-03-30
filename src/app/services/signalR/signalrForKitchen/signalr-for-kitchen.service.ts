import { Injectable } from '@angular/core';
import { OrderLineRead } from 'src/app/models/order-line/order-line-read';
import { OrderLineUpdate } from 'src/app/models/order-line/order-line-update';
import { SignalrService } from '../signalr.service';

@Injectable({
  providedIn: 'root'
})
export class SignalrForKitchenService extends SignalrService{
    public orderLinesForKitchen!: OrderLineRead[];

  public addListeners(): void {
    this.hubConnection.on("sentToKitchen", (data: OrderLineRead[]) => {
      console.log("Data received for kitchen")
      this.orderLinesForKitchen = data
    });
  }

  public getOrderLinesForKitchen() {
    this.http.get<OrderLineRead[]>(`${this.platformUrl}order-lines-for-kitchen`)
      .subscribe(
        data => this.orderLinesForKitchen = data,
        error => console.log(error)
      );
  }

  public updateOrderLine(orderLineUpdate: OrderLineUpdate) {
    super.updateOrderLine(orderLineUpdate);
  }

}
