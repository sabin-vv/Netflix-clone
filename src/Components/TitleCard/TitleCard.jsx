import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import instance from "../../Api/tmdb"
import "./Titlecard.css"

export default function TitleCard({ title, category }) {
    const [movieCard, setMovieCard] = useState([])
    const scrollRef = useRef(null)
    const navigate = useNavigate()


    useEffect(() => {
        instance.get(`/${category}?language=en-US&page=1`)
            .then(response => {
                setMovieCard(response.data.results)
            })

        scrollRef.current.addEventListener("wheel", (e) => {
            e.preventDefault()
            scrollRef.current.scrollLeft += e.deltaY;
        })
    }, [category])
    return (
        < div className="title-card" >
            <h2>{title}</h2>
            <div ref={scrollRef} className="movie-card">
                {movieCard ? movieCard.map((card, index) => {
                    return (
                        <div onClick={() => navigate(`/movie/info/${card.id}`)} className="card-items" key={index}>
                            <img className="movie-tile" src={`${import.meta.env.VITE_IMAGE_BASE_URL}` + /w300/ + `${card.backdrop_path}`} alt={card.title} />
                            <p>{card.title}</p>
                        </div>
                    )
                }) : <></>}
            </div>
        </div >
    )
};
