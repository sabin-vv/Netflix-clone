import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import TitleCard from "../../Components/TitleCard/TitleCard";
import play_icon from "../../assets/play_icon.png"
import info_icon from "../../assets/info_icon.png"
import Footer from "../../Components/Footer/Footer";
import instance from "../../Api/tmdb";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useAuth } from "../../Context/AuthContext";

export default function Home() {
    const { user } = useAuth()
    const [movie, setMovie] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) navigate("/login")
    })
    useEffect(() => {
        instance.get(`/now_playing?language=en-US&page=1`)
            .then(response => setMovie(response.data.results[0]))
    }, [])
    return (
        <div className="home">
            <Navbar />
            {movie && (
                <div className="movie" >
                    <img className="main-banner" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="" />
                    <div className="hero-title-container">
                        <h1>{movie.title}</h1>
                        <p>{movie.overview}</p>
                        <div className="btn-container">
                            <button className="play-btn" onClick={() => navigate(`/watch/${movie.id}`)}>
                                <img className="btn-icon" style={{ width: "20px", height: "20px" }} src={play_icon} alt="" />
                                Play</button>
                            <button className="info-btn" onClick={() => navigate(`/movie/info/${movie.id}`)}>
                                <img className="btn-icon" style={{ width: "24px", height: "24px" }} src={info_icon} alt="" />
                                More info</button>
                        </div>
                    </div>
                </div>)
            }
            <TitleCard title="Now Playing" category="now_playing" />
            <TitleCard title="Popular" category="popular" />
            <TitleCard title="Top Rated" category="top_rated" />
            <TitleCard title="Upcoming" category="upcoming" />
            <Footer />
        </div>
    );
}
