import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_API_URL } from 'src/app/app-injection-tokens';
import { MenuCategoryCreate } from 'src/app/models/menu-category/menu-category-create';
import { MenuCategoryRead } from 'src/app/models/menu-category/menu-category-read';
import { MenuCategoryUpdate } from 'src/app/models/menu-category/menu-category-update';

@Injectable({
  providedIn: 'root'
})
export class MenuCategoryService {
  private baseUrl = `${this.apiUrl}api/menuCategory`;

  constructor(private http: HttpClient, @Inject(APP_API_URL) private apiUrl: string) { }

  public getAllMenuCategories() {
    return this.http.get<MenuCategoryRead[]>(`${this.baseUrl}`);
  }

  public addMenuCategory(menuCategoryCreate: MenuCategoryCreate) {
    return this.http.post<MenuCategoryRead>(`${this.baseUrl}`, menuCategoryCreate);
  }

  public updateMenuCategory(menuCategoryUpdate: MenuCategoryUpdate) {
    return this.http.put(`${this.baseUrl}/${menuCategoryUpdate.id}`, menuCategoryUpdate);
  }

  public deleteMenuCategory(menuCategoryId: number) {
    return this.http.delete(`${this.baseUrl}/${menuCategoryId}`);
  }
  
}
