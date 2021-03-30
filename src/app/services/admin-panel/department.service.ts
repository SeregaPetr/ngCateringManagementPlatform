import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_API_URL } from 'src/app/app-injection-tokens';
import { DepartmentRead } from 'src/app/models/department/department-read';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private baseUrl = `${this.apiUrl}api/department`;

  constructor(private http: HttpClient, @Inject(APP_API_URL) private apiUrl: string) { }

  public getDepartments() {
    return this.http.get<DepartmentRead[]>(`${this.baseUrl}`);
  }

}
