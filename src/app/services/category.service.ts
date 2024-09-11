import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriesResponse } from '../interfaces/interfaces';

@Injectable()
export class CategoryService {
  private apiUrl = 'https://opentdb.com/api_category.php';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(this.apiUrl);
  }
}
