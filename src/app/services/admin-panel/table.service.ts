import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_API_URL } from 'src/app/app-injection-tokens';
import { TableCreate } from 'src/app/models/table/table-create';
import { TableRead } from 'src/app/models/table/table-read';
import { TableUpdate } from 'src/app/models/table/table-update';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private baseUrl = `${this.apiUrl}api/table`;

  constructor(private http: HttpClient, @Inject(APP_API_URL) private apiUrl: string) { }

  public getAllTables() {
    return this.http.get<TableRead[]>(`${this.baseUrl}`);
  }

  public addTable(tableCreate: TableCreate) {
    return this.http.post<TableRead>(`${this.baseUrl}`, tableCreate);
  }

  public updateTable(tableUpdate: TableUpdate) {
    return this.http.put(`${this.baseUrl}/${tableUpdate.id}`, tableUpdate);
  }

  public deleteTable(tableId: number) {
    return this.http.delete(`${this.baseUrl}/${tableId}`);
  }
  
}
