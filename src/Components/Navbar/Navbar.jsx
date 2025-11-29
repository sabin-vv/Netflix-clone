import { useEffect, useRef } from "react"
import logo from "../../assets/logo.png"
import searchIcon from "../../assets/search_icon.svg"
import notification from "../../assets/bell_icon.svg"
import profile from "../../assets/profile_img.png"
import dropdown from "../../assets/caret_icon.svg"
import { useAuth } from "../../Context/AuthContext"
import "./Navbar.css"
import { useNavigate } from "react-router-dom"

export default function Navbar() {
    const { logOut } = useAuth()
    const navRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY >= 80) {
                navRef.current?.classList?.add('nav-dark')
            } else {
                navRef.current?.classList?.remove('nav-dark')
            }
        })
    }, [])
    function handleLogout() {
        logOut()
        navigate("/login")
    }

    return (
        <div ref={navRef} className="navbar">
            <div className="navbar-left">
                <img onClick={() => navigate("/")} className="navbar-logo" src={logo} alt="logo" />
                <ul className="navbar-list">
                    <li onClick={() => navigate("/")}>Home</li>
                    <li>TV Shows</li>
                    <li>Movies</li>
                    <li>New & Popular</li>
                    <li onClick={() => navigate("/user/watchlist")}>My List</li>
                    <li>Browse by Languages</li>
                </ul>
            </div>
            <div className="navbar-right">
                <img src={searchIcon} alt="" />
                <span>kids</span>
                <img src={notification} alt="" />
                <div className="navbar-profile">
                    <img src={profile} alt="" />
                    <img src={dropdown} alt="" />
                    <div className="drop-down" onClick={handleLogout}>
                        Signout from Netflix
                    </div>
                </div>
            </div>
        </div >
    )
};
