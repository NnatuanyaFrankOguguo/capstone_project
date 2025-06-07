//# Fetch from TMDb API

export const fetchMovies = async (query) => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results || []; // Return movies or empty array
    } catch (error) {
        console.error('Error fetching movies:', error);
        return []; // Return empty array on error
    }
}