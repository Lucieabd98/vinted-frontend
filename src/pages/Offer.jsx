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
      {data.offers.map((offer) => {
        if (offer._id === id) {
          console.log(offer);
          return (
            <>
              <div key={offer.id} className="selected-offer">
                <div className="offer-content container">
                  <div className="offer-img">
                    <img src={offer.product_image.secure_url} />
                  </div>
                  <div className="offer-infos">
                    <div className="offer-general">
                      <p className="price">{offer.product_price} €</p>
                      <p>MARQUE {offer.product_details[0].MARQUE}</p>
                      <p>TAILLE {offer.product_details[1].TAILLE}</p>
                      <p>ETAT {offer.product_details[2].ÉTAT}</p>
                      <p>COULEUR {offer.product_details[3].COULEUR}</p>
                      <p>EMPLACEMENT {offer.product_details[4].EMPLACEMENT}</p>
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
                          <img src={userimg} alt="" />
                        </p>
                        <p>{offer.owner.account.username}</p>
                      </div>
                    </div>
                    <div>
                      <button className="buy-offer">Acheter</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        } else return null;
      })}
    </>
  );
};

export default Offer;
