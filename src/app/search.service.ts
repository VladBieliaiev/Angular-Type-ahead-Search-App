import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface SearchResult {
  title: string;
}

export interface SearchResponce {
  query: {
    search: SearchResult[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchApiUrl = 'https://en.wikipedia.org/w/api.php';

  constructor(private http: HttpClient) { }

  searchArticles(query: string, category: string): Observable<SearchResponce>{
    const params = {
      action: 'query',
      list: 'search',
      srlimit: 5, 
      srsearch: `${query} ${category}`,
      format: 'json',
      origin: '*',
    }
    console.log('params:', params);
    return this.http.get<SearchResponce>(this.searchApiUrl, { params });
  }
}
