import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentName, DepartmentRead } from 'src/app/models/department/department-read';
import { DishUpdate } from 'src/app/models/dish/dish-update';
import { DepartmentService } from 'src/app/services/admin-panel/department.service';
import { DishService } from 'src/app/services/admin-panel/dish.service';

@Component({
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.scss']
})
export class EditDishComponent implements OnInit {
  public dishForm!: FormGroup;
  public departments!: DepartmentRead[];
  @Input() dish!: DishUpdate;
  @Output() updateClickEvent = new EventEmitter();
  @Output() closeClickEvent = new EventEmitter();

  constructor(private dishService: DishService, private departmentService: DepartmentService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getDepartments();
    this.createFormGroup();
  } 
 
  public updateDish() {
    this.dish = this.dishForm.value;
   
    this.dishService.updateDish(this.dish).subscribe(
      () => {
        this.updateClick();
        alert("Данные успешно обновлены.")
      },
      error => {
        alert(`Данные не обновлены!!! Блюдо ${this.dish.nameDish} уже есть.`)
        this.closeClick();
    });
  }
  
  private getDepartments() {
    this.departmentService.getDepartments().subscribe(data => {
      this.departments = data.filter(d => d.id == DepartmentName.bar || d.id == DepartmentName.kitchen)
    });
  }

  private createFormGroup() {
    this.dishForm = this.fb.group({
      id: [this.dish.id],
      nameDish: [this.dish.nameDish, Validators.required],
      compositionDish: [this.dish.compositionDish, Validators.required],
      weight: [this.dish.weight, [Validators.required, Validators.min(0)]],
      price: [this.dish.price, [Validators.required, Validators.min(0)]],
      departmentId: [this.dish.departmentId, [Validators.required]],
    });
  }

  private closeClick() {
    this.closeClickEvent.emit();
  }

  private updateClick() {
    this.updateClickEvent.emit();
  }

}
