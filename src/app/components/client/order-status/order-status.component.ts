import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaymentType } from 'src/app/models/payment-type/payment-type';
import { SignalrForClienService } from 'src/app/services/signalR/signalrForClient/signalr-for-clien.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit, OnDestroy {
  public paymentTypes: PaymentType[] = [];

  constructor(private signalRService: SignalrForClienService) { }

  ngOnInit(): void {
    this.signalRService.getOrderForGuest();
    this.signalRService.getPaymentTypes()
      .subscribe(data => this.paymentTypes = data);
    this.signalRService.connect();
  }

  public get haveOrdersForGuest(): boolean {
    return this.signalRService.ordersForGuest.has(this.signalRService.getAccountId());
  }

  public get orderLinesForGuest() {
      return this.signalRService.ordersForGuest.get(this.signalRService.getAccountId())?.orderLines;
  }

  public get allDishesServed() {
    return this.signalRService.allDishesServed.get(this.signalRService.getAccountId());
  }

  public get statusOrder() {
    return this.signalRService.ordersForGuest.get(this.signalRService.getAccountId())?.statusOrder
  }

  public get nameWaiter() {
    return this.signalRService.ordersForGuest.get(this.signalRService.getAccountId())?.firstNameWaiter
  }

  public pay(paymentTypeId: number) {
    this.signalRService.pay(paymentTypeId);
  }

  public get orderAmount() {
    return this.countTotalOrder();
  }

  private countTotalOrder() {
    let orderAmount = 0
    this.orderLinesForGuest?.forEach(o => 
      orderAmount += o.countPortions * o.priceDish);
    return orderAmount;
  }

  ngOnDestroy(): void {
    this.signalRService.disconnect();
  }

}
