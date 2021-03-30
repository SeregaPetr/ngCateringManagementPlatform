import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuCreate } from 'src/app/models/menu/menu-create';
import { MenuRead } from 'src/app/models/menu/menu-read';
import { MenuUpdate } from 'src/app/models/menu/menu-update';
import { MenuService } from 'src/app/services/admin-panel/menu.service';

export const MENU_ID = 'MENU_ID';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.scss']
})
export class RestaurantMenuComponent implements OnInit {
  public menus: MenuRead[] = [];
  public modalTitle!: string;
  public activateAddEditComp: boolean = false;
  public title = "Редактирование меню";

  constructor(private menuService: MenuService, private router: Router) { }

  ngOnInit(): void {
    this.refreshMenusList();
  }

  public editMenu(menuId: number) {
    this.router.navigate([`/admin/create-menu/${menuId}`]);
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

  public makeActiveMenu(menuRead: MenuRead) {
    const menuUpdate = new MenuUpdate();
    menuUpdate.id = menuRead.id;
    menuUpdate.isActive = true;
    menuUpdate.nameMenu = menuRead.nameMenu;

    this.menuService.makeActiveMenu(menuUpdate).subscribe(
      () => this.refreshMenusList()
    );
  }
   
  public createUpdate() {
    this.close();
    this.refreshMenusList();
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
