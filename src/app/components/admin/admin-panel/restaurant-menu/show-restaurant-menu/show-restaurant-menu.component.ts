import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuRead } from 'src/app/models/menu/menu-read';

@Component({
  selector: 'app-show-restaurant-menu',
  templateUrl: './show-restaurant-menu.component.html',
  styleUrls: ['./show-restaurant-menu.component.scss']
})
export class ShowRestaurantMenuComponent implements OnInit {
  @Input() menus!: MenuRead[];
  @Output() editClickEvent = new EventEmitter<number>();
  @Output() deleteClickEvent = new EventEmitter<number>();
  @Output() makeActiveClickEvent = new EventEmitter<MenuRead>();

  constructor() { }

  ngOnInit(): void {
  }
  
  public editMenu(menuId: number) {
    this.editClickEvent.emit(menuId);
  }

  public deleteMenu(menuId: number) {
    this.deleteClickEvent.emit(menuId);
  }

  public makeActiveMenu(menu: MenuRead) {
    this.makeActiveClickEvent.emit(menu);
  }

}
