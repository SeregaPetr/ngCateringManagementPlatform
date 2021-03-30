import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CheckboxItem } from 'src/app/models/checkbox-item/checkbox-item';
import { DishUpdate } from 'src/app/models/dish/dish-update';
import { MenuCategoryRead } from 'src/app/models/menu-category/menu-category-read';
import { MenuCategoryUpdate } from 'src/app/models/menu-category/menu-category-update';
import { MenuRead } from 'src/app/models/menu/menu-read';
import { MenuUpdate } from 'src/app/models/menu/menu-update';
import { DishService } from 'src/app/services/admin-panel/dish.service';
import { MenuService } from 'src/app/services/admin-panel/menu.service';

@Component({
  selector: 'app-choice-dish',
  templateUrl: './choice-dish.component.html',
  styleUrls: ['./choice-dish.component.scss']
})
export class ChoiceDishComponent implements OnInit {
  public checkboxItems!: CheckboxItem[];
  @Input() menu!: MenuRead;
  @Input() menuCategory!: MenuCategoryRead;

  //TODO: события не пробрасываются, делаю перезагрузку страници!!!
  @Output() confirmChoiceEvent = new EventEmitter();
  @Output() closeClickEvent = new EventEmitter();
  
  constructor(private menuService: MenuService, private dishService: DishService) { }

  ngOnInit(): void {
    this.getDishesList();
  }

  public checkedDishes() {
    const menuUpdate = this.addSelectedDishesToMenu();
    
      this.menuService.createMenu(menuUpdate).subscribe(
        () => {
          this.confirmChoiceEvent.emit();
          alert("Данные успешно обновлены.");
          location.reload();
        },
        error => {
          alert(`Данные не обновлены!!!`)
          this.closeClickEvent.emit()
          location.reload();
        });
  }

  private addSelectedDishesToMenu() {
    const choiceItem = this.checkboxItems.filter(c => c.checked === true);

    const menuUpdate = new MenuUpdate();
    menuUpdate.id = this.menu.id;
    menuUpdate.isActive = this.menu.isActive;
    menuUpdate.nameMenu = this.menu.nameMenu;
    menuUpdate.menuCategories = this.menu.menuCategories.map<MenuCategoryUpdate>(mc => 
      new MenuCategoryUpdate(mc.id, mc.nameCategory, mc.dishes.map<DishUpdate>(d => 
        new DishUpdate(d.id, d.nameDish, d.compositionDish, d.weight, d.price, d.department.id))));

    menuUpdate.menuCategories.forEach(mc => {
      if (mc.id === this.menuCategory.id) {
        mc.dishes = choiceItem.map<DishUpdate>(d =>
           new DishUpdate(d.id, d.name, "xxx", 0, 0, 0 ));
      }
    });
    return menuUpdate;
  }

  private getDishesList() {
    this.dishService.getAllDishes().subscribe(data => {
      this.checkboxItems = data.map(mc => 
        new CheckboxItem(mc.id, mc.nameDish, false)
      );
      this.markSelected();
    });
  }

  private markSelected() {
    this.checkboxItems.forEach(x => {
      if(this.menuCategory.dishes.find(c => c.id === x.id)) {
        x.checked = true;
      }
    });
  }

}
