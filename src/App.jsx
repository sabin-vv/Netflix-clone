import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Player from "./Components/Player/Player";
import Login from "./Pages/Login/Login"
import { Toaster } from "react-hot-toast"
import MovieInfo from "./Pages/MovieInfo/MovieInfo";
import Watchlist from "./Pages/Watchlist/Watchlist";

function App() {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/watch/:id" element={<Player />} />
        <Route path="/movie/info/:id" element={<MovieInfo />} />
        <Route path="/user/watchlist" element={<Watchlist />} />
      </Routes>
    </>

  );
}

export default App;
