import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuCategory } from '../model/menu-category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuCategoryService {
  private apiUrl = 'https://testsvfcb.pythonanywhere.com/menu-category';

  constructor(private http: HttpClient) {}

  createMenuCategory(category: MenuCategory): Observable<MenuCategory> {
    return this.http.post<MenuCategory>(this.apiUrl, category);
  }

  getMenuCategories(): Observable<MenuCategory[]> {
    return this.http.get<MenuCategory[]>(this.apiUrl);
  }

  getMenuCategoryById(id: string | undefined): Observable<MenuCategory> {
    return this.http.get<MenuCategory>(`${this.apiUrl}/${id}`);
  }

  updateMenuCategory(id: string | undefined, category: MenuCategory): Observable<MenuCategory> {
    return this.http.put<MenuCategory>(`${this.apiUrl}/${id}`, category);
  }

  deleteMenuCategory(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
