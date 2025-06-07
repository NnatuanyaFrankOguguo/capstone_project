//  # Entry point

import { createSearchBar  } from "./components/SearchBar";
import './styles/base.css'
import './styles/layout.css'

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');

  const container = document.createElement('div');
  container.className = 'container';

  const header = document.createElement('h1');
  header.textContent = 'Book and Movie Explorer';

  const searchBarContainer = document.createElement('div');
  searchBarContainer.className = 'search-bar';

  const resultsContainer = document.createElement('div');
  resultsContainer.id = 'results';

  container.appendChild(header);
  container.appendChild(searchBarContainer);
  container.appendChild(resultsContainer);

  app.appendChild(container);

  createSearchBar(searchBarContainer);
});