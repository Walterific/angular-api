import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../model/menu';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiUrl = 'https://testsvfcb.pythonanywhere.com/menu';

  constructor(private http: HttpClient) {}

  createMenu(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(this.apiUrl, menu);
  }

  getMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.apiUrl);
  }

  getMenuByUUID(uuid: string | undefined): Observable<Menu> {
    return this.http.get<Menu>(`${this.apiUrl}/${uuid}`);
  }

  updateMenu(uuid: string | undefined, menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${this.apiUrl}/${uuid}`, menu);
  }

  deleteMenu(uuid: string | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${uuid}`);
  }

  getMenusByRestaurant(restaurantUuid: string): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiUrl}/restaurant/${restaurantUuid}`);
  }
}
