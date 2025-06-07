// # For displaying search results
export const createCard = (item, type) => {
    const card = document.createElement('div');
    card.className = 'card';

    const title = item.title || item.name || 'Unknown Title';
    const description = item.description || item.overview || 'No description available';
    const imageUrl = (item.volumeInfo?.imageLinks?.thumbnail) ||
                    (item.poster_path && `https://image.tmdb.org/t/p/w500${item.poster_path}`) ||
                    'https://via.placeholder.com/150';

    card.innerHTML = `
    <img src="${imageUrl}" alt="${title}" class="card-image">
    <h3>${title}</h3>
    <p>${description}</p>
    <button data-id="${item.id}" data-type="${type}">Add to Favorites</button>
    `;

    return card;
}