import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableInfoRead } from 'src/app/models/table-info/table-info-read';
import { TableInfoUpdate } from 'src/app/models/table-info/table-info-update';
import { SignalrService } from 'src/app/services/signalR/signalr.service';
import { SignalrForTableInfoService } from 'src/app/services/signalR/signalrForTableInfo/signalr-for-table-info.service';

@Component({
  selector: 'app-table-info',
  templateUrl: './table-info.component.html',
  styleUrls: ['./table-info.component.scss']
})
export class TableInfoComponent implements OnInit, OnDestroy {

  constructor(private signalRService: SignalrForTableInfoService) { }

  ngOnInit(): void {
    this.signalRService.getAllTablesInfo()
    this.signalRService.connect();
  }

  freeTable(tableInfoUpdate: TableInfoUpdate) {
    this.signalRService.freeTable(tableInfoUpdate);
  }

  public get tablesInfo(): TableInfoRead[] {
    return this.signalRService.tableInfoRead;
  }

  ngOnDestroy(): void {
    this.signalRService.disconnect();
  }

}
