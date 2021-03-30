import { Component, OnInit } from '@angular/core';
import { MenuCreate } from 'src/app/models/menu/menu-create';
import { MenuRead } from 'src/app/models/menu/menu-read';
import { MenuUpdate } from 'src/app/models/menu/menu-update';
import { MenuService } from 'src/app/services/admin-panel/menu.service';

@Component({
  selector: 'app-name-menu',
  templateUrl: './name-menu.component.html',
  styleUrls: ['./name-menu.component.scss']
})
export class NameMenuComponent implements OnInit {
  public menus: MenuRead[] = [];
  public modalTitle!: string;
  public activateAddEditComp: boolean = false;
  public menu!: any;

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.refreshMenusList();
  }

  public addMenu() {
    this.modalTitle = "Добавление названия меню.";
    this.menu = new MenuCreate();
    this.activateAddEditComp = true;
  }

  public editMenu(menu: MenuRead) {
    this.modalTitle="Редактирование названия меню.";
    this.activateAddEditComp = true;

    this.menu = new MenuUpdate();
    this.menu.id = menu.id;
    this.menu.isActive = menu.isActive;
    this.menu.nameMenu = menu.nameMenu;
  }

  public deleteMenu(menuId: number) {
    if(confirm('Вы уверены?')){
      this.menuService.deleteMenu(menuId).subscribe(()=>{
        this.refreshMenusList();
        alert("Данные успешно удалены!");
      },
      error => {
        alert("Данные не удалены!!!");
      });
    }
  }
 
  public createUpdate() {
    this.close();
    this.refreshMenusList();
  }

  public makeActiveMenu(menuRead: MenuRead) {
    const menuUpdate = new MenuUpdate();
    menuUpdate.id = menuRead.id;
    menuUpdate.isActive = true;
    menuUpdate.nameMenu = menuRead.nameMenu;

    this.menuService.makeActiveMenu(menuUpdate).subscribe(
      () => this.refreshMenusList()
    );
  }

  public close() {
    this.activateAddEditComp = false;
  }

  private refreshMenusList() {
    this.menuService.getAllMenus().subscribe(data => {
      this.menus = data
    });
  }

}
