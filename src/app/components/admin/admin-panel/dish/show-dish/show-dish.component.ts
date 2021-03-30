import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DishRead } from 'src/app/models/dish/dish-read';

@Component({
  selector: 'app-show-dish',
  templateUrl: './show-dish.component.html',
  styleUrls: ['./show-dish.component.scss']
})
export class ShowDishComponent implements OnInit {
  @Input() dishes!: DishRead[];
  @Output() addClickEvent = new EventEmitter();
  @Output() editClickEvent = new EventEmitter<DishRead>();
  @Output() deleteClickEvent = new EventEmitter<number>();
  
  constructor() { }

  ngOnInit(): void {
  }
  
  public addClick() {
    this.addClickEvent.emit();
  }

  public editClick(dish: DishRead) {
    this.editClickEvent.emit(dish);
  }

  public deleteClick(dishId: number) {
    this.deleteClickEvent.emit(dishId);
  }
  
}
