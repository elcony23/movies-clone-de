
import React, { useState , FC , memo } from "react"
import movies from '../../utils/movies.json'
import styles from './Movies.module.scss'
import Modal from 'react-modal';
import { useDispatch , useSelector } from 'react-redux'
import { setMovies ,selectFavoritesMovies } from '../../reducers/movies';
import IconStar from '../../img/star.png'
interface Props{
    movie: IMovie
    onClick: (data:IMovie) => void
    isFavorites:boolean
    onSelectFavoriteMovie?:any
}
interface RowProps{
    isFavorites:boolean
    title:string
    movies:IMovie[]
    onMovieClick?: any
    onSelectFavoriteMovie?:any
}
const Movies: FC = (props) => {
    const dispatch = useDispatch()
    const favoriteMovies = useSelector(selectFavoritesMovies)
    const [currentMovie,setCurrentMovie ] = useState<IMovie | undefined>(undefined)
    const [openModal , setOpenModal ] = useState(false)
    const [ search , setSearch ] = useState("")
    const onMovieClick = movie => {
        //dispatch(setMovies(movie))
        setCurrentMovie(movie)
        setOpenModal(true)
    }
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          border:'unset',
          backGround:'rgba(250, 251, 255, 0.7)',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width:'400px',
          boxShadow:'rgb(174 184 195 / 50%) 0px 6px 18px 0px'
        },
      };
      const onKeyPress = event => {
        if(event.key === 'Enter' || event.keyCode === 13){
            let moviesFiltered = movies.slice(0,10).filter(({title,info}) => {
                if(info && info.genres && info.genres.length > 0){
                    return title.toLowerCase().includes(search.toLowerCase()) || info.genres.map(genre => genre.toLowerCase()).includes(search.toLowerCase())
                }
                else
                    return title.toLowerCase().includes(search.toLowerCase())
            })
        }
      }
    return(
        <div className={styles['main-container']}>
            <div className={styles['filter-container']}>
                <input onChange={evt => setSearch(evt.target.value)} onKeyPress={(event) =>onKeyPress(event)} className={styles['input-search']} type="text" placeholder="Ingrese texto de búsqueda"/>
            </div>
            <Row
                title="Tendencias"
                isFavorites={false}
                movies={movies.slice(0,20)}
                onSelectFavoriteMovie={(movie) => dispatch(setMovies(movie))}
                onMovieClick={onMovieClick}
            />
            <Row
                title="Favoritos"
                isFavorites={true}
                movies={favoriteMovies}
            />
            <Modal
                isOpen={openModal}
                ariaHideApp={false}
                onRequestClose={() => {setOpenModal(false); setCurrentMovie(undefined)}}
                style={customStyles}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <h3>{currentMovie?.title} - {currentMovie?.year}</h3>
                        <div style={{display:'flex'}}>
                            {currentMovie?.info?.genres?.map((gender,idx) => <div key={idx} className={styles['genres']}>{gender}</div>)}
                        </div>
                        <br/>
                        {currentMovie?.info?.rating && <div>Rating ⭐ <strong>{currentMovie?.info?.rating}/10 </strong></div>}
                        <br/>
                        <p style={{margin:0}}>{currentMovie?.info?.plot}</p>
                        <div style={{display:'flex',flexDirection:'column'}}>
                            <br/>
                            {currentMovie?.info?.directors &&
                                <>
                                    <h5 style={{margin:0}}>Directores</h5>
                                    {currentMovie.info.directors.map((director,idx) => <div  key={idx} style={{marginRight:15}}>{director}</div>)}
                                </>
                            }
                            <br/>
                            {currentMovie?.info?.actors &&
                                <>
                                    <h5 style={{margin:0}}>Directores</h5>
                                    <div style={{display:'flex'}}>{currentMovie.info.actors.map((actor,idx) => <div key={idx} style={{marginRight:15}}>{actor}</div>)} </div>
                                </>
                            }
                        </div>
                    </div>
            </Modal>
        </div>
    )
}
const Row:FC<RowProps> = ({title,movies,onMovieClick,isFavorites,onSelectFavoriteMovie}) => {
    return(<div className={styles['movies-type']}>
    <>
        <h2 className={styles['movies-header']}>{title}</h2>
        <div className={styles['container-movies']}>
            {movies.map((movie,idx):any => <Movie key={idx} onSelectFavoriteMovie={onSelectFavoriteMovie} isFavorites={isFavorites} onClick={(movie) => onMovieClick(movie)} movie={movie}/>)}
        </div>
    </>
</div>)
}
const Movie: FC<Props> = memo(({movie,onClick,isFavorites,onSelectFavoriteMovie}) => {
    const selectFavoriteMovie = (event) =>{
        event.stopPropagation()
        onSelectFavoriteMovie(movie)
    }
    return(
        <div className={styles["movie"]} onClick={() => onClick(movie)}>
            {!isFavorites && <img alt="" className={styles['icon-star']} onClick={(evt) => selectFavoriteMovie(evt)} src={IconStar} style={{position:'absolute',bottom:20,right:15,width:25}}/>}
            <img src={movie.info.image_url} className={styles['img-movie']} alt=""/>
        </div>
        )
})
export default Movies