import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuCategoryUpdate } from 'src/app/models/menu-category/menu-category-update';
import { MenuCategoryService } from 'src/app/services/admin-panel/menu-category.service';

@Component({
  selector: 'app-edit-menu-category',
  templateUrl: './edit-menu-category.component.html',
  styleUrls: ['./edit-menu-category.component.scss']
})
export class EditMenuCategoryComponent implements OnInit {
  public menuCategoryForm!: FormGroup;
  @Input() menuCategory!: MenuCategoryUpdate;
  @Output() updateClickEvent = new EventEmitter();
  @Output() closeClickEvent = new EventEmitter();

  constructor(private menuCategoryService: MenuCategoryService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createFormGroup();
  } 
  
  public updateMenuCategory() {
    this.menuCategory = this.menuCategoryForm.value;

    this.menuCategoryService.updateMenuCategory(this.menuCategory).subscribe(
      () => {
        alert("Данные успешно обновлены");
        this.updateClick()
      },
      error => {
        alert(`Данные не обновлены!!! Категория меню ${this.menuCategory.nameCategory} уже есть.`)
        this.closeClick();
    });
  }

  private createFormGroup() {
    this.menuCategoryForm = this.fb.group({
      id: [this.menuCategory.id],
      nameCategory: [this.menuCategory.nameCategory, [Validators.required]],
    });
  }
  
  private closeClick() {
    this.closeClickEvent.emit();
  }

  private updateClick() {
    this.updateClickEvent.emit();
  }

}
