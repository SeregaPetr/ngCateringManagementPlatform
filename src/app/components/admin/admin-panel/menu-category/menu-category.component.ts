import { Component, OnInit } from '@angular/core';
import { MenuCategoryCreate } from 'src/app/models/menu-category/menu-category-create';
import { MenuCategoryRead } from 'src/app/models/menu-category/menu-category-read';
import { MenuCategoryUpdate } from 'src/app/models/menu-category/menu-category-update';
import { MenuCategoryService } from 'src/app/services/admin-panel/menu-category.service';

@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.scss']
})
export class MenuCategoryComponent implements OnInit {
  public menuCategories: MenuCategoryRead[] = [];
  public modalTitle!: string;
  public activateAddEditComp: boolean = false;
  public menuCategory!: any;

  constructor(private menuCategoryService: MenuCategoryService) { }

  ngOnInit(): void {
    this.refreshMenuCategoriesList();
  }

  public addMenuCategory() {
    this.modalTitle = "Добавление категории меню.";
    this.menuCategory = new MenuCategoryCreate();
    this.activateAddEditComp = true;
  }

  public editMenuCategory(menuCategory: MenuCategoryRead) {
    this.modalTitle="Редактирование категории меню.";
    this.activateAddEditComp = true;

    this.menuCategory = new MenuCategoryUpdate();
    this.menuCategory.id = menuCategory.id;
    this.menuCategory.nameCategory = menuCategory.nameCategory;
  }

  public deleteMenuCategory(menuCategoryId: number) {
    if(confirm('Вы уверены?')){
      this.menuCategoryService.deleteMenuCategory(menuCategoryId).subscribe(()=>{
        this.refreshMenuCategoriesList();
        alert("Данные успешно удалены!");
      },
      error => {
        alert("Данные не удалены!!!");
      });
    }
  }
  
  public createUpdate() {
    this.close();
    this.refreshMenuCategoriesList();
  }

  public close() {
    this.activateAddEditComp = false;
  }

  private refreshMenuCategoriesList() {
    this.menuCategoryService.getAllMenuCategories().subscribe(data =>
      this.menuCategories = data
    );
  }


}
