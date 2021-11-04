/// <reference types="react-scripts" />
interface MovieInfo{
    directors?: string[]
    release_date?: string
    rating?: number
    genres?: string[]
    image_url?: string
    plot?: string
    rank?: number
    running_time_secs?: number
    actors?: string[]
}
interface IMovie{
    id: number
    year: number
    title: string
    info: MovieInfo
}

interface Props{
    movie: IMovie
    onClick: (data:IMovie) => void
    isFavorites:boolean
    onSelectFavoriteMovie?:any
    isSelectedAsFavorite?:boolean
}
interface RowProps{
    isFavorites:boolean
    title:string
    movies:IMovie[]
    onMovieClick?: any
    onSelectFavoriteMovie?:any
    favoriteMovies?:IMoview[]
}