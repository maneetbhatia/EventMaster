import "./App.css";
import Banner from "./Banner";
import Footer from './Footer';
import EventDetails from "./EventDetails";
import Home from "./Home";
import ArtistDetail from "./ArtistDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryDetail from "./CategoryDetail";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import FavoriteList from "./FavoriteList";

function App() {

  return (
    <>
      <BrowserRouter>
        <Banner />
        <SearchBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/event/id/:eventID" element={<EventDetails />} />
            <Route exact path="/category/:category" element={<CategoryDetail />} />
            <Route exact path="/search/:searchValue" element={<SearchResults />} />
            <Route exact path="/artist/id/:artistID" element={<ArtistDetail />} />
            <Route exact path="/events" element={<FavoriteList />} />
          </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
