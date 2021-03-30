import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_API_URL } from 'src/app/app-injection-tokens';
import { MenuCreate } from 'src/app/models/menu/menu-create';
import { MenuRead } from 'src/app/models/menu/menu-read';
import { MenuUpdate } from 'src/app/models/menu/menu-update';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseUrl = `${this.apiUrl}api/menu`;

  constructor(private http: HttpClient, @Inject(APP_API_URL) private apiUrl: string) { }

  public getActiveMenu(): Observable<MenuRead> {
    return this.http.get<MenuRead>(`${this.baseUrl}/active-menu`);
  }

  public getMenuById(menuId: number): Observable<MenuRead> {
    return this.http.get<MenuRead>(`${this.baseUrl}/${menuId}`);
  }

  public getAllMenus() {
    return this.http.get<MenuRead[]>(`${this.baseUrl}`);
  }

  public addMenu(menuCreate: MenuCreate) {
    return this.http.post<MenuRead>(`${this.baseUrl}`, menuCreate);
  }

  public updateMenu(menuUpdate: MenuUpdate) {
    return this.http.put(`${this.baseUrl}/${menuUpdate.id}`, menuUpdate);
  }

  public deleteMenu(menuId: number) {
    return this.http.delete(`${this.baseUrl}/${menuId}`);
  }

  public makeActiveMenu(menuUpdate: MenuUpdate) {
    return this.http.put(`${this.baseUrl}/make-active-menu/${menuUpdate.id}`, menuUpdate);
  }

  public createMenu(menuUpdate: MenuUpdate) {
    return this.http.put(`${this.baseUrl}/create-menu/${menuUpdate.id}`, menuUpdate);
  }

}
