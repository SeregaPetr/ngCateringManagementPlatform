import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuRead } from 'src/app/models/menu/menu-read';
import { MenuService } from 'src/app/services/admin-panel/menu.service';
import { Order } from 'src/app/models/order/order';
import { DishRead } from 'src/app/models/dish/dish-read';
import { OrderLine } from 'src/app/models/order-line/order-line';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SignalrForClienService } from 'src/app/services/signalR/signalrForClient/signalr-for-clien.service';

export const ORDER = 'ORDER';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  public menu!: MenuRead;
  private order!: Order;
  public horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  public verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
      private as: AuthService,
      private menuService: MenuService,
      private signalRService: SignalrForClienService,
      private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.menuService.getActiveMenu()
      .subscribe(data => {
        this.menu = data;
      });
    this.getOrderFromStorage();

    if(this.as.isAuthenticated()) {
      this.signalRService.connect();
    }
  }

  private getOrderFromStorage() {
    const orderStorage = localStorage.getItem(ORDER);
    this.order = orderStorage !== null ? JSON.parse(orderStorage) : new Order();
  }

  public get paymentStatus() {
    return this.signalRService.ordersForGuest.get(this.signalRService.getAccountId())?.statusOrder == "Оплата"
  }

  public addDish(dish: DishRead) { 
    let dishOlreadySelected = false;
    this.openSnackBar(dish.nameDish);

    if(!this.order.orderLines) {
      this.order.orderLines = [];
    }

    this.order.orderLines.forEach(ol => {
      if(dish.id == ol.dish.id) {
        ol.countPortions++;
        dishOlreadySelected = true;
      }
    })

    if(!dishOlreadySelected) {
      const orderLine = new OrderLine();
      orderLine.countPortions = 1;
      orderLine.dish = dish;

      this.order.orderLines.push(orderLine);
    }
  }
  
  private openSnackBar(dishNameDish: string) {
    this.snackBar.open(dishNameDish, 'добавлено в заказ', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['snack-bar']
    });
  }
    
  ngOnDestroy(): void {
    localStorage.setItem(ORDER, JSON.stringify(this.order));
    this.signalRService.disconnect();
  }

}
