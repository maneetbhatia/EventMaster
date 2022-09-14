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
import ErrorPage from "./ErrorPage";
import ScrollToTop from "./ScrollToTop";

function App() {

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Banner />
        <SearchBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/event/id/:eventID" element={<EventDetails />} />
            <Route path="/category/:category" element={<CategoryDetail />} />
            <Route path="/search/:searchValue" element={<SearchResults />} />
            <Route path="/artist/id/:artistID" element={<ArtistDetail />} />
            <Route path="/favorite" element={<FavoriteList />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
