import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResponce } from '../interfaces/interfaces';

@Injectable()
export class SearchService {
  private searchApiUrl = 'https://en.wikipedia.org/w/api.php';

  constructor(private http: HttpClient) {}

  searchArticles(query: string, category: string): Observable<SearchResponce> {
    const params = {
      action: 'query',
      list: 'search',
      srlimit: 5,
      srsearch: `${query} ${category}`,
      format: 'json',
      origin: '*',
    };
    return this.http.get<SearchResponce>(this.searchApiUrl, { params });
  }
}
