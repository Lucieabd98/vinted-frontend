import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import heroimg from "../assets/imgs/heroimg.jpg";
import userimg from "../assets/imgs/user-icon.png";

const Home = ({ input, range, sortingPrices }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://site--backend-vinted--txtnrrwcytwl.code.run/offers?title=" +
        input +
        "&priceMin=" +
        range[0] +
        "&priceMax=" +
        range[1] +
        "&sort=" +
        sortingPrices
    );
    // console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [input, range, sortingPrices]);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <main>
        <div className="heroimg">
          <img src={heroimg} alt="image principale" />
          <div className="notice-sell">
            <p>Prêts à faire du tri dans vos placards ?</p>
            <button className="begin-to-sell">Commencer à vendre</button>
          </div>
        </div>
        <div className="container">
          <div className="home-offers container">
            {data.offers.map((offer) => {
              const offeridurl = `/offer/${offer._id}`;
              // console.log(offer);
              // console.log(offer.owner.account.avatar.secure_url);
              return (
                <>
                  <Link key={offer.id} to={offeridurl}>
                    <div className="one-offer">
                      <div className="top-offer">
                        {offer.owner.account.avatar ? (
                          <img
                            className="userimg"
                            src={offer.owner.account.avatar.secure_url}
                            alt="icone de l'utilisateur"
                          />
                        ) : (
                          <img className="userimg" src={userimg} />
                        )}

                        <p>{offer.owner.account.username}</p>
                      </div>
                      <div>
                        <img src={offer.product_image.secure_url} />
                        <div className="product-details">
                          <p>{offer.product_price} €</p>
                          <p>{offer.product_details[1].TAILLE}</p>
                          <p>{offer.product_details[0].MARQUE}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
