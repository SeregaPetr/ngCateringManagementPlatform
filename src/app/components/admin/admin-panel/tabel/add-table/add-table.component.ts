import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableCreate } from 'src/app/models/table/table-create';
import { TableService } from 'src/app/services/admin-panel/table.service';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.scss']
})
export class AddTableComponent implements OnInit {
  public tableForm!: FormGroup;
  @Input() table!: TableCreate;
  @Output() createClickEvent = new EventEmitter();
  @Output() closeClickEvent = new EventEmitter();

  constructor(private tableService: TableService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createFormGroup();
   } 
  
  private createFormGroup() {
    this.tableForm = this.fb.group({
      numberTable: ['', [Validators.required, Validators.min(1)]],
      capacityTable: ['', [Validators.required, Validators.min(1)]],
    });
  }

  public createTable(){
    this.table = this.tableForm.value;
 
    this.tableService.addTable(this.table).subscribe(
      () => {
        alert("Данные успешно добавлены");
        this.createClick()
      },
      error => {
        alert(`Данные не созданны!!! Стол с №${this.table.numberTable} уже есть.`);
        this.closeClick();
      });
    }
 
  private closeClick() {
    this.closeClickEvent.emit();
  }

  private createClick() {
    this.createClickEvent.emit();
  }

}
