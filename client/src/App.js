import "./App.css";
import Events from "./Events";
import Header from "./Header";
import Footer from './Footer';
import EventDetails from "./EventDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route exact path="/" element={<Events />} />
            <Route exact path="/event/detail/:eventID" element={<EventDetails />} />
            {/* <Route exact path="/shopping-cart" element={<ShoppingCart />} /> */}
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
