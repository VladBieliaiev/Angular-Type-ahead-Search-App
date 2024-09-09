# Accessible Type-ahead Search Component with Category Filters

## Project Overview

This project is an Angular application featuring an advanced type-ahead search component with category filters. The component includes various features and adheres to Web Accessibility Initiative (WAI-ARIA) standards to ensure accessibility for users relying on assistive technologies.

## Features Implemented

- **Angular Application Setup**: Created an Angular application using Angular CLI.
- **CategoryService**: Implemented a service to fetch a list of categories from the Open Trivia API.
- **TypeaheadSearch Component**:
  - **Search Input**: Added an input field for users to type search queries.
  - **Search Button**: Included a button to trigger search functionality.
  - **Category Dropdown**: Created a dropdown to list all available categories fetched from the CategoryService.
  - **Debounced Search**: Implemented debouncing with RxJS to limit API calls when the user types in the input field.
  - **Search API Integration**: Integrated with the Wikipedia API to fetch search results based on the selected category and search query.
  - **Results Dropdown**: Displayed the top 5 search results in a dropdown list below the input field.
  - **Result Selection**: Allowed users to select a result, which populates the input field, updates the selected category, and closes the results dropdown.
  - **LocalStorage**: Implemented functionality to save and retrieve the last search query and selected category using localStorage.
  - **Accessibility Compliance**: Ensured the component adheres to WAI-ARIA standards for accessibility.

## Technologies Used

- **Angular**: Frontend framework used to build the application.
- **TypeScript**: Language used for writing Angular components and services.
- **RxJS**: Library used for handling asynchronous operations and debouncing.
- **Angular Material**: UI component library used for styling and enhancing the user interface.
- **Open Trivia API**: Public API used to fetch categories.
- **Wikipedia API**: Public API used to fetch search results.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or later)
- [Angular CLI](https://angular.io/cli) (v12 or later)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/username/repository.git
   cd repository
