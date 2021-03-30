import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuCreate } from 'src/app/models/menu/menu-create';
import { MenuService } from 'src/app/services/admin-panel/menu.service';

@Component({
  selector: 'app-add-name-menu',
  templateUrl: './add-name-menu.component.html',
  styleUrls: ['./add-name-menu.component.scss']
})
export class AddNameMenuComponent implements OnInit {
  public menuForm!: FormGroup;
  @Input() menu!: MenuCreate;
  @Output() createClickEvent = new EventEmitter();
  @Output() closeClickEvent = new EventEmitter();

  constructor(private menuService: MenuService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createFormGroup();
   } 
 
  public createMenu() {
    this.menu = this.menuForm.value;
 
    this.menuService.addMenu(this.menu).subscribe(
      () => {
        alert("Данные успешно добавлены");
        this.createClick()
      },
      error => {
        alert(`Данные не созданны!!! Название меню ${this.menu.nameMenu} уже есть.`);
        this.closeClick();
    });
  }
 
  private createFormGroup() {
    this.menuForm = this.fb.group({
      nameMenu: ['', [Validators.required]],
    });
  }

  private closeClick() {
    this.closeClickEvent.emit();
  }

  private createClick() {
    this.createClickEvent.emit();
  }
}
