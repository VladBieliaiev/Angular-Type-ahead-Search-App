import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Category, SearchResult } from 'src/app/interfaces/interfaces';
import { CategoryService } from 'src/app/services/category.service';
import { SearchService } from 'src/app/services/search.service';
import { WrapWithUnderscopePipe } from 'src/app/features/wrap-with-underscope.pipe';

@Component({
  selector: 'app-typeahead-search',
  templateUrl: './typeahead-search.component.html',
  styleUrls: ['./typeahead-search.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, WrapWithUnderscopePipe],
})
export class TypeaheadSearchComponent {
  categories: Category[] = [];
  searchResults: SearchResult[] = [];
  searchQuery: string = '';
  selectedCategoryId: string = '';
  selectedCategoryName: string = '';
  searchSubject = new Subject<string>();

  constructor(
    private categoryService: CategoryService,
    private searchService: SearchService,
  ) {}

  ngOnInit(): void {
    this.loadCategories();

    const storedSearchTerm = localStorage.getItem('searchTerm');
    const storedCategoryId = localStorage.getItem('selectedCategoryId');

    if (storedSearchTerm) {
      this.searchQuery = storedSearchTerm;
      this.searchSubject.next(this.searchQuery);
    }

    if (storedCategoryId) {
      this.selectedCategoryId = storedCategoryId;
    }

    this.searchSubject
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((data) => {
        this.performSearch(data);
      });
  }

  onResultClick(result: SearchResult): void {
    this.searchQuery = result.title;
    this.searchSubject.next(this.searchQuery);
    this.searchResults = [];
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.trivia_categories;

        const storedCategoryId = localStorage.getItem('selectedCategoryId');
        if (storedCategoryId) {
          this.selectedCategoryId = storedCategoryId;
        }
      },
      error: (error) => console.error('Error loading categories:', error),
    });
  }

  onSearchInputChanged(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchSubject.next(inputValue);
  }

  onCategoryChange(): void {
    this.performSearch(this.searchQuery);
  }

  performSearch(searchTerm: string): void {
    const selectedCategory = this.categories.find(
      (category) => category.id === Number(this.selectedCategoryId),
    );

    this.selectedCategoryName = selectedCategory ? selectedCategory.name : '';

    localStorage.setItem('searchTerm', searchTerm);
    localStorage.setItem('selectedCategoryId', this.selectedCategoryId);
    localStorage.setItem('selectedCategoryName', this.selectedCategoryName);

    this.searchService
      .searchArticles(searchTerm, this.selectedCategoryName)
      .subscribe({
        next: (data) => {
          if (data.query.search.length === 0) {
            this.searchResults = [];
            alert('No results found for the given search term and category.');
          } else {
            this.searchResults = data.query.search;
          }
        },
        error: (error) => {
          console.error('Error:', error);
          alert('An error occurred while searching for articles.');
        },
      });
  }
}
