import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Publish = ({ token, setToHide }) => {
  const navigate = useNavigate();
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [conditon, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [exchanges, setExchanges] = useState(false);
  const [pictureFromCloudinary, setPictureFromCloudinary] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      formData.append("Title", title);
      formData.append("Description", description);
      formData.append("Price", price);
      formData.append("Condition", conditon);
      formData.append("City", location);
      formData.append("Brand", brand);
      formData.append("Size", size);
      formData.append("Color", color);
      formData.append("Picture", picture);

      const response = await axios.post(
        "https://site--backend-vinted--txtnrrwcytwl.code.run/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setPictureFromCloudinary(response.data.secure_url);
      setToHide(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="background">
        <div className="publish-offer container">
          <h2>Vends ton article</h2>
          <form className="form-offers  " onSubmit={handleSubmit}>
            <div className="file-upload">
              <input
                type="file"
                onChange={(event) => {
                  setPicture(event.target.files[0]);
                }}
              />
            </div>
            <div>
              <div>
                <p>Titre</p>
                <input
                  type="text"
                  placeholder="ex: Chemise Sézane Verte"
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
              </div>
              <div>
                <p>Décris ton article</p>
                <input
                  type="text"
                  placeholder="ex: Porté quelques fois, taille correctement"
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <div>
                <p>Marque</p>
                <input
                  type="text"
                  placeholder="ex: Zara"
                  onChange={(event) => {
                    setBrand(event.target.value);
                  }}
                />
              </div>
              <div>
                <p>Taille</p>
                <input
                  type="text"
                  placeholder="ex: L/40/12"
                  onChange={(event) => {
                    setSize(event.target.value);
                  }}
                />
              </div>
              <div>
                <p>Couleur</p>
                <input
                  type="text"
                  placeholder="ex: Fushia"
                  onChange={(event) => {
                    setColor(event.target.value);
                  }}
                />
              </div>
              <div>
                <p>État</p>
                <input
                  type="text"
                  placeholder="Neuf avec étiquette"
                  onChange={(event) => {
                    setCondition(event.target.value);
                  }}
                />
              </div>
              <div>
                <p>Lieu</p>
                <input
                  type="text"
                  placeholder="ex: Paris"
                  onChange={(event) => {
                    setLocation(event.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <div>
                <p>Prix</p>
                <input
                  type="text"
                  name=""
                  placeholder="0,00€"
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  type="checkbox"
                  name=""
                  onChange={(event) => {
                    setExchanges(!exchanges);
                  }}
                />
                <p>Je suis intéressé(e) par les échanges</p>
              </div>
            </div>
            <div className="div-publish-offer">
              <div>
                <button className="publish-offer" type="submit">
                  Ajouter
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Publish;
