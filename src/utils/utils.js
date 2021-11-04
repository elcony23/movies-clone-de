export const filteredMovies = ({movies,search,startDate,endDate}) => {
    return movies.filter(({title,info}) => {
        const date = new Date(info.release_date).getTime()
        return (date >= startDate && date <= endDate) && (title.toLowerCase().includes(search.toLowerCase())
            ||
            info.genres.map(genre => genre.toLowerCase()).includes(search.toLowerCase()))
    })
}