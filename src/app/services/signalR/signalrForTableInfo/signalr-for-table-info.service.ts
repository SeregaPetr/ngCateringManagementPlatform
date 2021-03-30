import { Injectable } from '@angular/core';
import { TableInfoRead } from 'src/app/models/table-info/table-info-read';
import { TableInfoUpdate } from 'src/app/models/table-info/table-info-update';
import { SignalrService } from '../signalr.service';

@Injectable({
  providedIn: 'root'
})
export class SignalrForTableInfoService extends SignalrService{
  public tableInfoRead!: TableInfoRead[];

  public addListeners(): void {
    this.hubConnection.on("sentToAdminTables", (data: TableInfoRead[]) => {
      console.log("Data received for admin");
      this.tableInfoRead = data;
    });
  }

  public getAllTablesInfo() {
    return this.http.get<TableInfoRead[]>(`${this.platformUrl}tables-info`)
    .subscribe(
      data => {
        this.tableInfoRead = data
      },
      error => console.log(error)
    );  
  }

  public freeTable(tableInfoUpdate: TableInfoUpdate) {
    this.http.post(`${this.platformUrl}free-table`, tableInfoUpdate)
     .subscribe(
       ()=> console.log("TableInfo was changed"),
       error => console.log(error)
     );
  }
}
