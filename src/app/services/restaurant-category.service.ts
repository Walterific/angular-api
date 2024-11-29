import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestaurantCategory } from '../model/restaurant-category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantCategoryService {
  private apiUrl = 'https://testsvfcb.pythonanywhere.com/restaurant-category';

  constructor(private http: HttpClient) {}

  createRestaurantCategory(category: RestaurantCategory): Observable<RestaurantCategory> {
    return this.http.post<RestaurantCategory>(this.apiUrl, category);
  }

  getRestaurantCategories(): Observable<RestaurantCategory[]> {
    return this.http.get<RestaurantCategory[]>(this.apiUrl);
  }

  getRestaurantCategoryByUUID(uuid: string | undefined): Observable<RestaurantCategory> {
    return this.http.get<RestaurantCategory>(`${this.apiUrl}/${uuid}`);
  }

  updateRestaurantCategory(uuid: string | undefined, category: RestaurantCategory): Observable<RestaurantCategory> {
    return this.http.put<RestaurantCategory>(`${this.apiUrl}/${uuid}`, category);
  }

  deleteRestaurantCategory(uuid: string | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${uuid}`);
  }
}
