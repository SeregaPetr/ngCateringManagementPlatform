import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuUpdate } from 'src/app/models/menu/menu-update';
import { MenuService } from 'src/app/services/admin-panel/menu.service';

@Component({
  selector: 'app-edit-name-menu',
  templateUrl: './edit-name-menu.component.html',
  styleUrls: ['./edit-name-menu.component.scss']
})
export class EditNameMenuComponent implements OnInit {
  public menuForm!: FormGroup;
  @Input() menu!: MenuUpdate;
  @Output() updateClickEvent = new EventEmitter();
  @Output() closeClickEvent = new EventEmitter();

  constructor(private menuService: MenuService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createFormGroup();
  } 
  
  public updateMenu() {
    this.menu = this.menuForm.value;

    this.menuService.updateMenu(this.menu).subscribe(
      () => {
        alert("Данные успешно обновлены");
        this.updateClick()
      },
      error => {
        alert(`Данные не обновлены!!! Название меню ${this.menu.nameMenu} уже есть.`)
        this.closeClick();
    });
  }

  private createFormGroup() {
    this.menuForm = this.fb.group({
      id: [this.menu.id],
      nameMenu: [this.menu.nameMenu, [Validators.required]],
    });
  }
  
  private closeClick() {
    this.closeClickEvent.emit();
  }

  private updateClick() {
    this.updateClickEvent.emit();
  }

}
