//# Fetch from Google Books API
// This file is responsible for communicating with the Google Books API

export const fetchBooks = async (query) => {
    const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
       return data.items || []; // Return books or empty array
    } catch (error) {
        console.error('Error fetching books:', error);
        return []; // Return empty array on error
    }
}