import { useEffect, useState } from "react"
import '../components/favMovies.css';

export const FavMovies = (props) => {
    const [favMovies, setFavMovies] = useState(props.favMovies);
    const [isPlaying, setIsPlaying] = useState(true);

    const [slider, setSlider] = useState(document.querySelector('.fav-slider'));
    const [cardWidth, setCardWidth] = useState();

    const [initialPos, setInitialPos] = useState();

    useEffect(() => {
        setFavMovies(props.favMovies)
    }, [props.favMovies])

    useEffect(() => {
        setSlider(document.querySelector('.fav-slider'));
        setCardWidth(document.querySelector('.slider-card').clientWidth);
        setInitialPos(cardWidth);
        //setIsPlaying(true);
    }, [props.favMovies, cardWidth])

    useEffect(() => {
        if (initialPos) {
            slider.scrollTo(initialPos, 0);
            setIsPlaying(isPlaying);
        }

    }, [initialPos])


    useEffect(() => {
        let milisecs = 1500;
        let maxScroll = (favMovies.length - 1) * cardWidth;

        var timerID;

        console.log(isPlaying)

        if (isPlaying) {
            console.log('just chilling')

            timerID = setInterval(() => {
                slider.scrollBy(cardWidth, 0);
                if (slider.scrollLeft > maxScroll) slider.scrollTo(0, 0)
            }, milisecs)

        } else {
            console.log('im not cleaning the interval')
            if (timerID) clearInterval(timerID); setInitialPos(cardWidth);
        };

    }, [isPlaying, favMovies, slider, cardWidth])


    const togglePlayer = () => {
        setIsPlaying(!isPlaying)
    }

    return (
        <div className={favMovies.length > 0 ? 'fav-slider' : 'fav-slider skeleton'} >
            <button onClick={togglePlayer} className="toggleButton">{isPlaying ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}</button>
            <>{favMovies ? favMovies.map((movie, key) =>
                <div key={key} id={movie.id} className='slider-card'>
                    <img className="slider-img" src={movie.imgUrl} alt="" />
                    <p className="slider-text">{movie.name}</p>
                </div>)
                : null}</>
        </div >


    )
}

//setDisplayedMovie(props.favMovies[0])
// let lastMovieIndex = favMovies.findIndex(movie => movie === displayedMovie);
// if (e.target.id === 'backButton') {
//     if (lastMovieIndex < 1) setDisplayedMovie(favMovies[favMovies.length - 1])
//     else setDisplayedMovie(favMovies[lastMovieIndex - 1])
// } else {
//     if (lastMovieIndex >= favMovies.length - 1) setDisplayedMovie(favMovies[0])
//     else setDisplayedMovie(favMovies[lastMovieIndex + 1])
// }
// <div className={displayedMovie ? 'fav-slider' : 'fav-slider skeleton'} >
//     <p id='backButton' className="slide-button" onClick={slideImg}>-</p>
//     <img src={displayedMovie.imgUrl} alt="" className={displayedMovie ? '' : 'd-none'} />
//     <p id="nextButton" className="slide-button" onClick={slideImg}>+</p>
// </div >