import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuCategoryRead } from 'src/app/models/menu-category/menu-category-read';

@Component({
  selector: 'app-show-menu-category',
  templateUrl: './show-menu-category.component.html',
  styleUrls: ['./show-menu-category.component.scss']
})
export class ShowMenuCategoryComponent implements OnInit {
  @Input() menuCategories!: MenuCategoryRead[];
  @Output() addClickEvent = new EventEmitter();
  @Output() editClickEvent = new EventEmitter<MenuCategoryRead>();
  @Output() deleteClickEvent = new EventEmitter<number>();
  
  constructor() { }

  ngOnInit(): void {
  }
  
  public addClick() {
    this.addClickEvent.emit();
  }

  public editClick(menuCategory: MenuCategoryRead) {
    this.editClickEvent.emit(menuCategory);
  }

  public deleteClick(menuCategoryId: number) {
    this.deleteClickEvent.emit(menuCategoryId);
  }
}
