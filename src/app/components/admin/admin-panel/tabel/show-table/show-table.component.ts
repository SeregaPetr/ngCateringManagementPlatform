import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableRead } from 'src/app/models/table/table-read';

@Component({
  selector: 'app-show-table',
  templateUrl: './show-table.component.html',
  styleUrls: ['./show-table.component.scss']
})
export class ShowTableComponent implements OnInit {
  @Input() tables!: TableRead[];
  @Output() addClickEvent = new EventEmitter();
  @Output() editClickEvent = new EventEmitter<TableRead>();
  @Output() deleteClickEvent = new EventEmitter<number>();
  
  constructor() { }

  ngOnInit(): void {
  }
  
  public addClick() {
    this.addClickEvent.emit();
  }

  public editClick(table: TableRead) {
    this.editClickEvent.emit(table);
  }

  public deleteClick(tableId: number) {
    this.deleteClickEvent.emit(tableId);
  }
  
}

