import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_API_URL } from 'src/app/app-injection-tokens';
import { DishCreate } from 'src/app/models/dish/dish-create';
import { DishRead } from 'src/app/models/dish/dish-read';
import { DishUpdate } from 'src/app/models/dish/dish-update';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private baseUrl = `${this.apiUrl}api/dish`;

  constructor(private http: HttpClient, @Inject(APP_API_URL) private apiUrl: string) { }

  public getAllDishes() {
    return this.http.get<DishRead[]>(`${this.baseUrl}`);
  }

  public addDish(dishCreate: DishCreate) {
    return this.http.post<DishRead>(`${this.baseUrl}`, dishCreate);
  }

  public updateDish(dishUpdate: DishUpdate) {
    return this.http.put(`${this.baseUrl}/${dishUpdate.id}`, dishUpdate);
  }

  public deleteDish(dishId: number) {
    return this.http.delete(`${this.baseUrl}/${dishId}`);
  }

}
