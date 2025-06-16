//  # Entry point

import { createSearchBar  } from "./components/SearchBar";
import { createCard } from "./components/Card";
import './styles/base.css'
import './styles/layout.css'
import './styles/components.css'

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');

  const container = document.createElement('div');
  container.className = 'container';

  const header = document.createElement('header');
  header.className = 'main-header';
  header.innerHTML = `
    <h1>Book and Movie Explorer</h1>
    <nav>
      <button class="nav-btn active" data-section="search">Search</button>
      <button class="nav-btn" data-section="favorites">Favorites</button>
    </nav>
  `;

  const mainContent = document.createElement('main');
  mainContent.className = 'main-content';

  const searchSection = document.createElement('section');
  searchSection.id = 'search-section';
  searchSection.className = 'active-section';

  const searchBarContainer = document.createElement('div');
  searchBarContainer.className = 'search-bar';

  // Add search filter buttons
  const searchFilter = document.createElement('div');
  searchFilter.className = 'search-filter';
  searchFilter.innerHTML = `
    <button class="filter-btn active" data-filter="all">
      <i class="fas fa-th-large"></i>
      All
    </button>
    <button class="filter-btn" data-filter="books">
      <i class="fas fa-book"></i>
      Books
    </button>
    <button class="filter-btn" data-filter="movies">
      <i class="fas fa-film"></i>
      Movies
    </button>
  `;

  const resultsContainer = document.createElement('div');
  resultsContainer.id = 'results';
  resultsContainer.className = 'results-grid';

  const favoritesSection = document.createElement('section');
  favoritesSection.id = 'favorites-section';
  favoritesSection.className = 'favorites-section';

  searchSection.appendChild(searchBarContainer);
  searchSection.appendChild(searchFilter);
  searchSection.appendChild(resultsContainer);
  mainContent.appendChild(searchSection);
  mainContent.appendChild(favoritesSection);

  container.appendChild(header);
  container.appendChild(mainContent);
  app.appendChild(container);

  // Initialize search bar
  createSearchBar(searchBarContainer);

  // Navigation handling
  const navButtons = header.querySelectorAll('.nav-btn');
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      navButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Show corresponding section
      const section = button.dataset.section;
      document.querySelectorAll('section').forEach(s => s.classList.remove('active-section'));
      document.getElementById(`${section}-section`).classList.add('active-section');

      // If favorites section is selected, update the display
      if (section === 'favorites') {
        updateFavoritesDisplay();
      }
    });
  });

  // Search filter handling
  let currentFilter = 'all';
  const filterButtons = searchFilter.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active filter button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Update current filter
      currentFilter = button.dataset.filter;
      
      // Filter the results
      filterResults();
    });
  });

  // Function to filter results
  function filterResults() {
    const cards = resultsContainer.querySelectorAll('.card');
    cards.forEach(card => {
      const type = card.querySelector('.favorite-btn').dataset.type;
      
      if (currentFilter === 'all' || 
          (currentFilter === 'books' && type === 'book') || 
          (currentFilter === 'movies' && type === 'movie')) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Function to update favorites display
  function updateFavoritesDisplay() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favoritesSection.innerHTML = '';

    if (favorites.length === 0) {
      favoritesSection.innerHTML = '<p class="no-favorites">No favorites yet. Start adding some!</p>';
      return;
    }

    const favoritesGrid = document.createElement('div');
    favoritesGrid.className = 'results-grid';
    
    favorites.forEach(item => {
      const card = createCard(item, item.type);
      favoritesGrid.appendChild(card);
    });

    favoritesSection.appendChild(favoritesGrid);
  }

  // Add event listener for search results
  document.addEventListener('searchResults', (event) => {
    const { results, type } = event.detail;
    resultsContainer.innerHTML = '';
    
    results.forEach(item => {
      const card = createCard(item, type);
      resultsContainer.appendChild(card);
    });

    // Apply current filter
    filterResults();
  });
});