import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import userimg from "../assets/imgs/user-icon.png";

const Offer = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      `https://site--backend-vinted--txtnrrwcytwl.code.run/offers/`
    );

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
      {data.offers.map((offer) => {
        if (offer._id === id) {
          return (
            <div key={offer._id} className="selected-offer">
              <div className="offer-content container">
                <div key={offer.product_image.secure_url} className="offer-img">
                  <img src={offer.product_image.secure_url} alt="product" />
                </div>
                <div className="offer-infos">
                  <div className="offer-general">
                    <p className="price">{offer.product_price} €</p>
                    <p>
                      <span>{Object.keys(offer.product_details[0])}</span>
                      <span>{offer.product_details[0].MARQUE}</span>
                    </p>
                    <p>
                      <span>{Object.keys(offer.product_details[1])}</span>
                      <span>{offer.product_details[1].TAILLE}</span>
                    </p>
                    <p>
                      <span>{Object.keys(offer.product_details[2])}</span>
                      <span>{offer.product_details[2].ÉTAT}</span>
                    </p>
                    <p>
                      <span>{Object.keys(offer.product_details[3])}</span>
                      <span> {offer.product_details[3].COULEUR}</span>
                    </p>
                    <p>
                      <span>{Object.keys(offer.product_details[4])}</span>
                      <span>{offer.product_details[4].EMPLACEMENT}</span>
                    </p>
                  </div>
                  <div>
                    <p className="divider">
                      ____________________________________________
                    </p>
                  </div>
                  <div className="offer-description">
                    <p>{offer.product_name}</p>
                    <p>{offer.product_description}</p>
                    <div className="user-info">
                      <p>
                        {offer.owner.account.avatar ? (
                          <img
                            src={offer.owner.account.avatar.secure_url}
                            alt="avatar de l'utilisateur"
                          />
                        ) : (
                          <img src={userimg} alt="avatar par defaut" />
                        )}
                      </p>
                      <p>{offer.owner.account.username}</p>
                    </div>
                  </div>
                  <Link
                    to="/payment"
                    state={{
                      sellername: offer.owner.account.username,
                      title: offer.product_name,
                      price: offer.product_price,
                      description: offer.product_description,
                    }}
                  >
                    <div>
                      <button className="buy-offer">Acheter</button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          );
        } else return null;
      })}
    </>
  );
};

export default Offer;
