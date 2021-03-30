import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuCategoryCreate } from 'src/app/models/menu-category/menu-category-create';
import { MenuCategoryService } from 'src/app/services/admin-panel/menu-category.service';

@Component({
  selector: 'app-add-menu-category',
  templateUrl: './add-menu-category.component.html',
  styleUrls: ['./add-menu-category.component.scss']
})
export class AddMenuCategoryComponent implements OnInit {
  public menuCategoryForm!: FormGroup;
  @Input() menuCategory!: MenuCategoryCreate;
  @Output() createClickEvent = new EventEmitter();
  @Output() closeClickEvent = new EventEmitter();

  constructor(private menuCategoryService: MenuCategoryService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createFormGroup();
  } 
  
  public createMenuCategory() {
    this.menuCategory = this.menuCategoryForm.value;
 
    this.menuCategoryService.addMenuCategory(this.menuCategory).subscribe(
      () => {
        alert("Данные успешно добавлены");
        this.createClick()
      },
      error => {
        alert(`Данные не созданны!!! Категория меню ${this.menuCategory.nameCategory} уже есть.`);
        this.closeClick();
    });
  }
 
  private createFormGroup() {
    this.menuCategoryForm = this.fb.group({
      nameCategory: ['', [Validators.required]],
    });
  }

  private closeClick() {
    this.closeClickEvent.emit();
  }

  private createClick() {
    this.createClickEvent.emit();
  }

}
