import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuCategoryRead } from 'src/app/models/menu-category/menu-category-read';
import { MenuRead } from 'src/app/models/menu/menu-read';
import { MenuService } from 'src/app/services/admin-panel/menu.service';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.scss']
})
export class CreateMenuComponent implements OnInit {
  private menuId!: number;
  public menu!: MenuRead;
  public menuCategory!: MenuCategoryRead;
  public modalTitle!: string;
  public activateAddMenuCategoryToMenuComp: boolean = false;
  public activateAddDishToMenuComp: boolean = false;

  constructor(
    private menuService: MenuService, 
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    const menuId = this.route.snapshot.paramMap.get('id');
    this.menuId = menuId !== null ? +menuId : 0;

    this.refresMenu();
  }

  public addMenuCategoryToMenu() {
    this.modalTitle = "Добавление категорий меню.";
    this.activateAddMenuCategoryToMenuComp = true;
  }

  public addDishToMenu(menuCategory: MenuCategoryRead) {
    this.modalTitle = "Добавление блюд.";
    this.menuCategory = menuCategory;
    this.activateAddDishToMenuComp = true;
  }

  public createUpdate() {
    this.close();
    this.refresMenu();
  }

  public close() {
    this.activateAddDishToMenuComp = false;
    this.activateAddMenuCategoryToMenuComp = false;
  }

  private refresMenu() {
    this.menuService.getMenuById(this.menuId).subscribe(data => {
      this.menu = data;
    });
  }
}
