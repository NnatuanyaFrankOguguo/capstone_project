// # Search input + handler
// Creates a search input and triggers the fetching of both books and movies
import { fetchBooks } from '../api/books.js';
import { fetchMovies } from '../api/movies.js';
import { createCard } from './Card.js';

export const createSearchBar = (container) => {
    const input = document.createElement('input');
    input.placeholder = 'Search for books or movies...';

    const button = document.createElement('button');
    button.textContent = 'Search';

    container.appendChild(input);
    container.appendChild(button);

    button.addEventListener('click', async () => {
        const query = input.value.trim();
        if (!query) {
            alert('Please enter a search term.');
            return;
        }

        const books = await fetchBooks(query);
        const movies = await fetchMovies(query);

        // Clear previous results
        const resultsContainer = document.querySelector('#results');
        resultsContainer.innerHTML = '';

        // Display books
        books.forEach(book => {
            const card = createCard(book.volumeInfo, 'book');
            resultsContainer.appendChild(card);
        });

        // Display movies
        movies.forEach(movie => {
            const card = createCard(movie, 'movie');
            resultsContainer.appendChild(card);
        })
    })
}