import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableUpdate } from 'src/app/models/table/table-update';
import { TableService } from 'src/app/services/admin-panel/table.service';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.scss']
})
export class EditTableComponent implements OnInit {
  public tableForm!: FormGroup;
  @Input() table!: TableUpdate;
  @Output() updateClickEvent = new EventEmitter();
  @Output() closeClickEvent = new EventEmitter();

  constructor(private tableService: TableService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createFormGroup();
    this.subscribeToggle();
  } 
  
  public updateTable() {
    this.table = this.tableForm.value;

    this.tableService.updateTable(this.table).subscribe(
      () => {
        alert("Данные успешно обновлены.");
        this.updateClick()
      },
    error => {
      alert(`Данные не обновлены!!! Стол с №${this.table.numberTable} уже есть.`)
      this.closeClick();
    });
  }

  private createFormGroup() {
    this.tableForm = this.fb.group({
      id: [this.table.id],
      numberTable: [this.table.numberTable, [Validators.required, Validators.min(1)]],
      isReservation: [this.table.isReservation],
      capacityTable: [this.table.capacityTable, [Validators.required, Validators.min(1)]],
      numberGuests: [this.table?.numberGuests ?? 0, Validators.min(0)],
    });
  }

  private closeClick() {
    this.closeClickEvent.emit();
  }

  private updateClick() {
    this.updateClickEvent.emit();
  }

  private subscribeToggle() {
    if(!this.table.isReservation) {
      this.tableForm.controls["numberGuests"].disable();
    }

    this.tableForm.controls["isReservation"].valueChanges.subscribe(() => {
      if(!this.tableForm.controls["isReservation"].value) {
        this.tableForm.controls["numberGuests"].disable();
      }
      else {
        this.tableForm.controls["numberGuests"].enable();
      }
    });
  }

}
