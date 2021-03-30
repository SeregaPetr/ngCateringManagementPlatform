import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CheckboxItem } from 'src/app/models/checkbox-item/checkbox-item';
import { DishUpdate } from 'src/app/models/dish/dish-update';
import { MenuCategoryUpdate } from 'src/app/models/menu-category/menu-category-update';
import { MenuRead } from 'src/app/models/menu/menu-read';
import { MenuUpdate } from 'src/app/models/menu/menu-update';
import { MenuCategoryService } from 'src/app/services/admin-panel/menu-category.service';
import { MenuService } from 'src/app/services/admin-panel/menu.service';

@Component({
  selector: 'app-choice-menu-category',
  templateUrl: './choice-menu-category.component.html',
  styleUrls: ['./choice-menu-category.component.scss']
})
export class ChoiceMenuCategoryComponent implements OnInit {
  public checkboxItems!: CheckboxItem[];
  @Input() menu!: MenuRead;
  @Output() confirmChoiceEvent = new EventEmitter();
  @Output() closeClickEvent = new EventEmitter();
  
  constructor(private menuService: MenuService, private menuCategoryService: MenuCategoryService) { }

  ngOnInit(): void {
    this.getMenuCategoriesList();
  }

  public checkedMenuCategory() { 
    const menuUpdate = this.addSelectedMenuCategoryToMenu();
 
    this.menuService.createMenu(menuUpdate).subscribe(
      () => {
        this.confirmChoiceEvent.emit();
        alert("Данные успешно обновлены.");
      },
      error => {
        alert(`Данные не обновлены!!!`)
        this.closeClickEvent.emit()
      });
  }

  private addSelectedMenuCategoryToMenu() {
    const choiceItem = this.checkboxItems.filter(c => c.checked === true);

    const menuUpdate = new MenuUpdate();
    menuUpdate.id = this.menu.id;
    menuUpdate.isActive = this.menu.isActive;
    menuUpdate.nameMenu = this.menu.nameMenu;
    menuUpdate.menuCategories = choiceItem.map<MenuCategoryUpdate>(x => 
      new MenuCategoryUpdate(x.id, x.name));

    menuUpdate.menuCategories.forEach(mc => {
      const menuCategories = this.menu.menuCategories.find(m => m.id === mc.id);

      if(menuCategories) {
          mc.dishes = menuCategories.dishes.map<DishUpdate>(d =>
            new DishUpdate(d.id, d.nameDish, d.compositionDish, d.weight, d.price, d.department.id));
        }
    });
    return menuUpdate;
  }

  private getMenuCategoriesList() {
    this.menuCategoryService.getAllMenuCategories().subscribe(data => {
      this.checkboxItems = data.map(mc => 
        new CheckboxItem(mc.id, mc.nameCategory, false)
      );
      this.markSelected();
    });
  }

  private markSelected() {
    this.checkboxItems.forEach(x => {
      if(this.menu.menuCategories.find(c => c.id === x.id)) {
        x.checked = true;
      }
    });
  }
 
}
