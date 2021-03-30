import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuRead } from 'src/app/models/menu/menu-read';

@Component({
  selector: 'app-show-name-menu',
  templateUrl: './show-name-menu.component.html',
  styleUrls: ['./show-name-menu.component.scss']
})
export class ShowNameMenuComponent implements OnInit {
  @Input() menus!: MenuRead[];
  @Output() addClickEvent = new EventEmitter();
  @Output() editClickEvent = new EventEmitter<MenuRead>();
  @Output() deleteClickEvent = new EventEmitter<number>();
  @Output() makeActiveClickEvent = new EventEmitter<MenuRead>();

  constructor() { }

  ngOnInit(): void {
  }
  
  public addMenu() {
    this.addClickEvent.emit();
  }

  public editMenu(menu: MenuRead) {
    this.editClickEvent.emit(menu);
  }

  public deleteMenu(menuId: number) {
    this.deleteClickEvent.emit(menuId);
  }

  public makeActiveMenu(menu: MenuRead) {
    this.makeActiveClickEvent.emit(menu);
  }

}
