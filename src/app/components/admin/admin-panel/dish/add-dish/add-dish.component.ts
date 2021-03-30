import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentName, DepartmentRead } from 'src/app/models/department/department-read';
import { DishCreate } from 'src/app/models/dish/dish-create';
import { DepartmentService } from 'src/app/services/admin-panel/department.service';
import { DishService } from 'src/app/services/admin-panel/dish.service';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.scss']
})
export class AddDishComponent implements OnInit {
  public dishForm!: FormGroup;
  public departments!: DepartmentRead[];
  @Input() dish!: DishCreate;
  @Output() createClickEvent = new EventEmitter();
  @Output() closeClickEvent = new EventEmitter();

  constructor(private dishService: DishService, private departmentService: DepartmentService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getDepartments();
    this.createFormGroup();
   } 
   
  public createDish() {
    this.dish = this.dishForm.value;
 
    this.dishService.addDish(this.dish).subscribe(
      () => {
        this.createClick();
        alert("Данные успешно добавлены");
      },
      error => {
        alert(`Данные не добавлены!!! Блюдо ${this.dish.nameDish} уже есть.`)
        this.closeClick();
    });
  }
 
  private createFormGroup() {
    this.dishForm = this.fb.group({
      nameDish: ['', Validators.required],
      compositionDish: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
      departmentId: ['', [Validators.required]],
    });
  }

  private getDepartments() {
    this.departmentService.getDepartments().subscribe(data => {
      this.departments = data.filter(d => d.id == DepartmentName.bar || d.id == DepartmentName.kitchen)
    });
  }
  
  private closeClick() {
    this.closeClickEvent.emit();
  }

  private createClick() {
    this.createClickEvent.emit();
  }

}
