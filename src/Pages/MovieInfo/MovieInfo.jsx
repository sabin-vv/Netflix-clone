import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../../Components/Navbar/Navbar"
import { useEffect, useState } from "react"
import instance from "../../Api/tmdb"
import play_icon from "../../assets/play_icon.png"
import Footer from "../../Components/Footer/Footer"
import { useAuth } from "../../Context/AuthContext"
import "./MovieInfo.css"

export default function MovieInfo() {
    const { user, watchlist, addWatchlist, removeWatchlist } = useAuth()
    const navigate = useNavigate()
    const [movie, setMovie] = useState(null)
    const [recommendation, setRecommendation] = useState([])
    const { id } = useParams()

    const isSaved = watchlist.some(item => item.id === movie?.id)

    function handleWatchlist() {
        if (!user) return
        isSaved ? removeWatchlist(movie.id) : addWatchlist(movie)
    }

    useEffect(() => {
        instance.get(`/${id}?language=en-US`)
            .then(response => setMovie(response.data)
            )
    }, [id])

    useEffect(() => {
        instance.get(`/${id}/similar`)
            .then(response => setRecommendation(response.data.results))
    }, [id])

    return (
        <div className="movie-container">
            <Navbar />
            {movie && (
                <div className="movie-details">
                    <img className="movie-banner" src={`${import.meta.env.VITE_IMAGE_BASE_URL}` + /original/ + `${movie.backdrop_path}`} alt="" />
                    <div className="movie-banner-info">
                        <h2>{movie.title}</h2>
                        <div className="banner-button-wrap">
                            <button onClick={() => navigate(`/watch/${movie.id}`)} className="play-button"><img className="play-btn-img" src={play_icon} alt="" /> Play</button>
                            {isSaved ? <svg onClick={handleWatchlist} width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.048"></g><g id="SVGRepo_iconCarrier"> <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z" fill="#fafafa"></path> </g></svg>
                                : <svg onClick={handleWatchlist} width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM16 12.75H12.75V16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16V12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H11.25V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z" fill="#e2e3e4"></path> </g></svg>}
                        </div>
                    </div>
                    <div className="movie-info">
                        <div className="movie-overview">
                            {movie.overview}
                        </div>
                        <div className="movie-geners">
                            <p>Geners </p>
                            <ul className="genre-list">
                                {movie.genres.map(g => (
                                    <li key={g.id}>{g.name}</li>
                                )
                                )}
                            </ul>
                        </div>
                        <div className="movie-production">
                            <p>Production </p>
                            <ul className="production-list">
                                {movie.production_companies.map(c =>
                                    <li key={c.id}>{c.name}</li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="spoken-lang-container">
                        {movie.spoken_languages.map((l, index) => {
                            return (
                                <div key={index}>
                                    <li>{l.english_name}</li>
                                </div>
                            )
                        })}
                    </div>
                    {recommendation.length > 0 && (
                        <div className="recommendation">
                            <h2>More Like This</h2>
                            <div className="rec-card-container">
                                {recommendation.filter(rec => rec.backdrop_path !== null).slice(0, 12).map(rec => {
                                    return (
                                        <div key={rec.id} className="rec-card" onClick={() => navigate(`/movie/info/${rec.id}`)}>
                                            <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}` + /w300/ + `${rec.backdrop_path}`} alt="Movie" />
                                            <p>{rec.title}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}
            <Footer />
        </div >
    )
};
