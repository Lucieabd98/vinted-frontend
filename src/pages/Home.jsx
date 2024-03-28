import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import heroimg from "../assets/imgs/heroimg.jpg";
import userimg from "../assets/imgs/user-icon.png";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://site--backend-vinted--txtnrrwcytwl.code.run/offers"
    );
    console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <main>
        <div className="heroimg">
          <img src={heroimg} alt="image principale" />
        </div>
        <div className="container">
          <div className="home-offers container">
            {data.offers.map((offer) => {
              const offeridurl = `/offer/${offer._id}`;
              // console.log(offer);
              return (
                <>
                  <Link key={offer.id} to={offeridurl}>
                    <div className="one-offer">
                      <div className="top-offer">
                        <p>
                          <img
                            className="userimg"
                            src={userimg}
                            alt="icone de l'utilisateur"
                          />
                        </p>
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
