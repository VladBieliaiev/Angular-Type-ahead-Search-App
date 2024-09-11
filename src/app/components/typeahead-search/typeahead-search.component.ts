import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
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
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    WrapWithUnderscopePipe,
  ],
})
export class TypeaheadSearchComponent {
  categories: Category[] = [];
  searchResults: SearchResult[] = [];
  searchQuery: string = '';
  selectedCategoryId: string = '';
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
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data.trivia_categories;
        console.log(data.trivia_categories);
      },
      (error) => console.error('Error:', error),
    );
  }

  onSearchInputChanged(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchSubject.next(inputValue);
  }

  performSearch(searchTerm: string): void {
    localStorage.setItem('searchTerm', searchTerm);
    localStorage.setItem('selectedCategoryId', this.selectedCategoryId);

    const selectedCategory = this.categories.find(
      (category) => category.id.toString() === this.selectedCategoryId,
    );
    const selectedCategoryName = selectedCategory ? selectedCategory.name : '';

    this.searchService
      .searchArticles(searchTerm, selectedCategoryName)
      .subscribe(
        (data) => {
          if (data.query.search.length === 0) {
            this.searchResults = [];
            alert('No results found for the given search term and category.');
          } else {
            this.searchResults = data.query.search;
            console.log(this.searchResults);
          }
        },
        (error) => {
          console.error('Error:', error);
          alert('An error occurred while searching for articles.');
        },
      );
  }
}
