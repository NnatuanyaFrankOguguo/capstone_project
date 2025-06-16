// # For displaying search results
export const createCard = (item, type) => {
    const card = document.createElement('div');
    card.className = 'card';

    const title = item.title || item.name || 'Unknown Title';
    const description = item.description || item.overview || 'No description available';
    const imageUrl = (item.volumeInfo?.imageLinks?.thumbnail) ||
                    (item.poster_path && `https://image.tmdb.org/t/p/w500${item.poster_path}`) ||
                    'https://via.placeholder.com/150';

    // Check if item is in favorites
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFavorite = favorites.some(fav => fav.id === item.id && fav.type === type);

    card.innerHTML = `
        <div class="card-content">
            <img src="${imageUrl}" alt="${title}" class="card-image">
            <div class="card-details">
                <h3 class="card-title">${title}</h3>
                <p class="card-description">${description.substring(0, 150)}${description.length > 150 ? '...' : ''}</p>
                <div class="card-actions">
                    <button class="favorite-btn ${isFavorite ? 'favorited' : ''}" data-id="${item.id}" data-type="${type}">
                        <i class="fas ${isFavorite ? 'fa-heart' : 'fa-heart-o'}"></i>
                        ${isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                    <button class="view-details-btn" data-id="${item.id}" data-type="${type}">
                        <i class="fas fa-info-circle"></i>
                        View Details
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add click handler for favorite button
    const favoriteBtn = card.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const itemId = favoriteBtn.dataset.id;
        const itemType = favoriteBtn.dataset.type;
        
        const existingIndex = favorites.findIndex(fav => fav.id === itemId && fav.type === itemType);
        
        if (existingIndex === -1) {
            // Add to favorites
            favorites.push({
                id: itemId,
                type: itemType,
                title: title,
                imageUrl: imageUrl,
                description: description
            });
            favoriteBtn.classList.add('favorited');
            favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Remove from Favorites';
        } else {
            // Remove from favorites
            favorites.splice(existingIndex, 1);
            favoriteBtn.classList.remove('favorited');
            favoriteBtn.innerHTML = '<i class="fas fa-heart-o"></i> Add to Favorites';
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
    });

    // Add click handler for view details button
    const viewDetailsBtn = card.querySelector('.view-details-btn');
    viewDetailsBtn.addEventListener('click', () => {
        showDetailsModal(item, type);
    });

    return card;
}

// Function to show details modal
function showDetailsModal(item, type) {
    const modal = document.createElement('div');
    modal.className = 'details-modal';
    
    const title = item.title || item.name || 'Unknown Title';
    const description = item.description || item.overview || 'No description available';
    const imageUrl = (item.volumeInfo?.imageLinks?.thumbnail) ||
                    (item.poster_path && `https://image.tmdb.org/t/p/w500${item.poster_path}`) ||
                    'https://via.placeholder.com/150';
    
    // Additional details based on type
    let additionalDetails = '';
    if (type === 'book') {
        const authors = item.volumeInfo?.authors?.join(', ') || 'Unknown Author';
        const publishedDate = item.volumeInfo?.publishedDate || 'Unknown Date';
        const publisher = item.volumeInfo?.publisher || 'Unknown Publisher';
        const pageCount = item.volumeInfo?.pageCount || 'Unknown';
        
        additionalDetails = `
            <div class="details-info">
                <p><strong>Authors:</strong> ${authors}</p>
                <p><strong>Published Date:</strong> ${publishedDate}</p>
                <p><strong>Publisher:</strong> ${publisher}</p>
                <p><strong>Pages:</strong> ${pageCount}</p>
            </div>
        `;
    } else if (type === 'movie') {
        const releaseDate = item.release_date || 'Unknown Date';
        const voteAverage = item.vote_average || 'N/A';
        const runtime = item.runtime ? `${item.runtime} minutes` : 'Unknown';
        
        additionalDetails = `
            <div class="details-info">
                <p><strong>Release Date:</strong> ${releaseDate}</p>
                <p><strong>Rating:</strong> ${voteAverage}/10</p>
                <p><strong>Runtime:</strong> ${runtime}</p>
            </div>
        `;
    }

    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="${imageUrl}" alt="${title}">
                </div>
                <div class="modal-details">
                    <h2>${title}</h2>
                    ${additionalDetails}
                    <div class="modal-description">
                        <h3>Description</h3>
                        <p>${description}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Function to close modal and restore scrolling
    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        modal.addEventListener('transitionend', () => {
            modal.remove();
        }, { once: true });
    };

    // Add click handler for close button
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Add modal to body
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open

    // Trigger animation
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
}