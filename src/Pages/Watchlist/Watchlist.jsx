import "./Watchlist.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Watchlist() {
    const { watchlist, removeWatchlist } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="watchlist-page">
            <Navbar />
            <div className="watchlist-content">
                <h1>My List</h1>
                {watchlist.length === 0 ? (
                    <p className="empty-text">Your watchlist is empty.</p>
                ) : (
                    <div className="watchlist-grid">
                        {watchlist.map((movie) => (
                            <div key={movie.id} className="watchlist-card" >
                                <img onClick={() => navigate(`/movie/info/${movie.id}`)} src={`${import.meta.env.VITE_IMAGE_BASE_URL}/w300${movie.backdrop_path}`} alt={movie.title} />
                                <div className="card-info">
                                    <p className="title">{movie.title}</p>
                                    <button className="remove-btn" onClick={() => removeWatchlist(movie.id)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
