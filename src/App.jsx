import React, { useState } from "react";

import Cookies from "js-cookie";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./assets/components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
library.add(faArrowDown, faArrowUp);

function App() {
  const [input, setInput] = useState("");
  const [range, setRange] = useState([10, 150]);
  const [sortPrice, setSortPrice] = useState(false);
  let sortingPrices = "";

  if (sortPrice === false) {
    sortingPrices = "asc";
  } else {
    sortingPrices = "desc";
  }

  const [toHide, setToHide] = useState(false);

  const [token, setToken] = useState(Cookies.get("token") || null);

  const [pageNumber, setPageNumber] = useState(1);
  const [maxOffer, setMaxOffer] = useState();

  let maxPages = Math.ceil(maxOffer / 10);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 10 });
      setToken(token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };

  return (
    <>
      <Router>
        <Header
          token={token}
          handleToken={handleToken}
          input={input}
          setInput={setInput}
          range={range}
          setRange={setRange}
          sortPrice={sortPrice}
          setSortPrice={setSortPrice}
          toHide={toHide}
          setToHide={setToHide}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                input={input}
                range={range}
                sortPrice={sortPrice}
                sortingPrices={sortingPrices}
                setToHide={setToHide}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                maxOffer={maxOffer}
                setMaxOffer={setMaxOffer}
                maxPages={maxPages}
              />
            }
          />
          <Route path="/offer/:id" element={<Offer />} />
          <Route
            path="/signup"
            element={<Signup handleToken={handleToken} setToHide={setToHide} />}
          />
          <Route
            path="/login"
            element={<Login handleToken={handleToken} setToHide={setToHide} />}
          />

          <Route
            path="/offer/publish"
            element={<Publish token={token} setToHide={setToHide} />}
          />
          <Route
            path="/payment"
            element={<Payment token={token} setToHide={setToHide} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
