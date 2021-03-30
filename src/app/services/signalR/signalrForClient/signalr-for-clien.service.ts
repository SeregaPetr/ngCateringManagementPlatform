import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderCreate } from 'src/app/models/order/order-create';
import { OrderRead } from 'src/app/models/order/order-read';
import { OrderUpdate } from 'src/app/models/order/order-update';
import { PaymentType } from 'src/app/models/payment-type/payment-type';
import { SignalrService } from '../signalr.service';

@Injectable({
  providedIn: 'root'
})
export class SignalrForClienService extends SignalrService {
  public ordersForGuest = new Map<string, OrderRead>();
  public allDishesServed = new Map<string, boolean>();

  public addListeners(): void {
    this.hubConnection.on("sentToClien", (data: OrderRead) => {
      if( this.getAccountId() == data.accountId) {
        console.log("Data received for clien");
        this.ordersForGuest.set(this.getAccountId(), data);
        this.allDishesServed.set(this.getAccountId(), !this.isOrderExecuted(data));
      }
    });

    this.hubConnection.on("sentToClienLogout", (data: string) => {
      if( this.getAccountId() == data) {
        this.logout();
      }
    });
  }

  public confirmOrder(orderCreate: OrderCreate) {
    return this.http.post(`${this.platformUrl}confirm-order`, orderCreate);
  }

  public pay(paymentTypeId: number) {
    const order = this.ordersForGuest.get(this.getAccountId());
    
    if(order != null) {
      const orderUpdate = new OrderUpdate()
      orderUpdate.id = order.id;
      orderUpdate.paymentTypeId = paymentTypeId;

      this.http.put(`${this.platformUrl}payment/${orderUpdate.id}`, orderUpdate)
        .subscribe( 
          ()=> console.log("Payment"),
          error => console.log(error)
        );
    }    
  }

  public getOrderForGuest() {
    this.http.get<OrderRead>(`${this.platformUrl}order-for-guest`)
      .subscribe(data => {
        if(data.id > 0) {
          this.ordersForGuest.set(this.getAccountId(), data);
          this.allDishesServed.set(this.getAccountId(), !this.isOrderExecuted(data));
        }
      },error => console.log(error));
  }

  public getPaymentTypes(): Observable<PaymentType[]> {
    return this.http.get<PaymentType[]>(`${this.baseApiUrl}paymentType`)
  }

  private isOrderExecuted(orderRead: OrderRead) {
    let orderExecuted = true;
    orderRead.orderLines.forEach(ol => {
      if(ol.nameStatus != "Заказ подан" || orderRead.statusOrder != "Счет открыт") {
        orderExecuted = false;
      }
    });
   return orderExecuted;
  }

}
