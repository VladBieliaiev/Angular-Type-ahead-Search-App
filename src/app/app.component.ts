import { Component } from '@angular/core';
import { TypeaheadSearchComponent } from './components/typeahead-search/typeahead-search.component';
import { CategoryService } from './services/category.service';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [TypeaheadSearchComponent],
  providers: [
    {
      provide: CategoryService,
      useClass: CategoryService,
    },
    {
      provide: SearchService,
      useClass: SearchService,
    },
  ],
})
export class AppComponent {
  title = 'typeahead-search-app';
}
