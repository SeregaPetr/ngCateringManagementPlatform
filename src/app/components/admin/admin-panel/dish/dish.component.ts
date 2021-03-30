import { Component, OnInit } from '@angular/core';
import { DishCreate } from 'src/app/models/dish/dish-create';
import { DishRead } from 'src/app/models/dish/dish-read';
import { DishUpdate } from 'src/app/models/dish/dish-update';
import { DishService } from 'src/app/services/admin-panel/dish.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {
  public dishes: DishRead[] = [];
  public modalTitle!: string;
  public activateAddEditComp: boolean = false;
  public dish!: any;

  constructor(private dishService: DishService) { }

  ngOnInit(): void {
    this.refreshDidhesList();
  }

  public addDish(){
    this.modalTitle = "Добавление блюда.";
    this.dish = new DishCreate();
    this.activateAddEditComp = true;
  }

  public editDish(dish: DishRead){
    this.modalTitle="Редактирование блюда.";
    this.activateAddEditComp = true;

    this.dish = new DishUpdate();
    this.dish.id = dish.id;
    this.dish.nameDish = dish.nameDish;
    this.dish.compositionDish = dish.compositionDish;
    this.dish.weight = dish.weight;
    this.dish.price = dish.price;
    this.dish.departmentId = dish.department.id;
  }
 
  public deleteDish(dishId: number) {
    if(confirm('Вы уверены?')) {
      this.dishService.deleteDish(dishId).subscribe(()=> {
        this.refreshDidhesList();
        alert("Данные успешно удалены!");
      },
      error => {
        alert("Данные не удалены!!!");
      });
    }
  }

  public createUpdate() {
    this.close();
    this.refreshDidhesList();
  }

  public close() {
     this.activateAddEditComp = false;
  }

  private refreshDidhesList() {
    this.dishService.getAllDishes().subscribe(data => 
      this.dishes = data);
  }

}
