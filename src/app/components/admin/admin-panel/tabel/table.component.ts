import { Component, OnInit } from '@angular/core';
import { TableCreate } from 'src/app/models/table/table-create';
import { TableRead } from 'src/app/models/table/table-read';
import { TableUpdate } from 'src/app/models/table/table-update';
import { TableService } from 'src/app/services/admin-panel/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public tables: TableRead[] = [];
  public modalTitle!: string;
  public activateAddEditComp: boolean = false;
  public table!: any;

  constructor(private tableService: TableService) { }

  ngOnInit(): void {
    this.refreshTablesList();
  }

  public addTable(){
    this.modalTitle = "Добавление стола.";
    this.table = new TableCreate();
    this.activateAddEditComp = true;
  }

  public editTable(table: TableRead) {
    this.modalTitle="Редактирование стола.";
    this.activateAddEditComp = true;

    this.table = new TableUpdate();
    this.table.id = table.id;
    this.table.numberTable = table.numberTable;
    this.table.isReservation = table.isReservation
    this.table.capacityTable = table.capacityTable;
    this.table.numberGuests = table.numberGuests;
  }

  public deleteTable(tableId: number) {
    if(confirm('Вы уверены?')){
      this.tableService.deleteTable(tableId).subscribe(()=>{
        this.refreshTablesList();
        alert("Данные успешно удалены!");
      },
      error => {
        alert("Данные не удалены!!!");
      });
    }
  }
  
  public createUpdate() {
    this.close();
    this.refreshTablesList();
  }

  public close() {
    this.activateAddEditComp = false;
  }

  private refreshTablesList() {
    this.tableService.getAllTables().subscribe(data => 
      this.tables = data);
  }

}
