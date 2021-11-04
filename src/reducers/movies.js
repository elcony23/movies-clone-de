import { createSlice } from '@reduxjs/toolkit';

export const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        favorites:[]
    },
    reducers: {
        setMovies: (state, action) => {
            const data = [...state.favorites,action.payload]
            state.favorites = data
        },
    },
});

export const { setMovies } = movieSlice.actions;

export const selectFavoritesMovies = (state) => state.movies.favorites;

export default movieSlice.reducer;