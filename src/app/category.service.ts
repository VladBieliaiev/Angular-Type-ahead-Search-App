import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



export interface Category {
  id: number;
  name: string;
}

export interface CategoriesResponse {
  trivia_categories: Category[];
}
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'https://opentdb.com/api_category.php';
  private http = inject(HttpClient);

  constructor() { }

  getCategories() : Observable<CategoriesResponse>{
    return this.http.get<CategoriesResponse>(this.apiUrl);
  }
}
