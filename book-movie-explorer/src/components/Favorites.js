//# Manage local favorites
// Basic localStorage-based favorite system

export const addToFavorites = (item) => {
    const existing = JSON.parse(localStorage.getItem('favorites')) || [];
    existing.push(item);
    localStorage.setItem('favorites', JSON.stringify(existing));
}

export const getFavorites = () => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}