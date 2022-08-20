import "./App.css";
import Header from "./Header";
import Footer from './Footer';
import EventDetails from "./EventDetails";
import Category from "./Category";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/event/id/:eventID" element={<EventDetails />} />
            <Route exact path="/category/:category" element={<Category />} />
            {/* <Route exact path="/items" element={<ListingPage />} />
            <Route exact path="/checkout" element={<OrderForm />} />
            <Route exact path="/confirmation" element={<Confirmation />} />
            <Route path="*" element={<ErrorPage />} /> */}
          </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
