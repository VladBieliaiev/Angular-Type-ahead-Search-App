export interface Category {
  id: number;
  name: string;
}

export interface CategoriesResponse {
  trivia_categories: Category[];
}

export interface SearchResult {
  title: string;
}

export interface SearchResponce {
  query: {
    search: SearchResult[];
  };
}
