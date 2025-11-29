import { useNavigate, useParams } from "react-router-dom"
import YouTube from "react-youtube"
import instance from "../../Api/tmdb"
import { useEffect, useState } from "react"
import backArrow from "../../assets/back_arrow_icon.png"
import "./Player.css"

export default function Player() {
    const [videoKey, setVideoKey] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    const opts = {
        height: '100%',
        width: '90%',
        playerVars: {
            autoplay: 0,
        },
    };

    useEffect(() => {
        instance.get(`/${id}/videos?language=en-US`)
            .then(response => {
                const results = response.data.results
                const trailer = results.length ? results.find((t) => t.type === "Trailer") : null
                setVideoKey(trailer?.key)
            })
    }, [id])

    return (
        <div className="player">
            <img className="player-back-button" src={backArrow} alt="" onClick={() => navigate(-1)} />
            {videoKey && <YouTube videoId={videoKey} opts={opts} className="play-box" />}
        </div>
    )
};
