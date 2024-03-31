import React, { useState, useEffect } from "react";
import axios from "axios";

import Cookies from "js-cookie";

import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Header from "./assets/components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const [input, setInput] = useState("");
  const [range, setRange] = useState([10, 100]);
  const [sortPrice, setSortPrice] = useState(false);

  const [token, setToken] = useState(Cookies.get("token") || null);
  console.log(token);

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
        />
        <Routes>
          <Route
            path="/"
            element={<Home input={input} range={range} sortPrice={sortPrice} />}
          />
          <Route path="/offer/:id" element={<Offer />} />
          <Route
            path="/signup"
            element={<Signup handleToken={handleToken} />}
          />
          <Route path="/login" element={<Login handleToken={handleToken} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
