import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

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
      setPictureFromCloudinary(response.data.secure_url);
      setToHide(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return token ? (
    <>
      <div className="background">
        <div className="publish-offer container">
          <h2>Vends ton article</h2>
          <form className="form-offers  " onSubmit={handleSubmit}>
            <div className="file-upload">
              <label htmlFor="file">
                + Ajoute une photo
                <input
                  id="file"
                  type="file"
                  required
                  onChange={(event) => {
                    setPicture(event.target.files[0]);
                  }}
                />
              </label>
              {picture && (
                <img
                  src={URL.createObjectURL(picture)}
                  alt="produit choisi"
                  style={{ display: "flex", height: "80px" }}
                />
              )}
            </div>
            <div>
              <div>
                <label htmlFor="title">Titre</label>
                <textarea
                  id="title"
                  type="text"
                  required
                  placeholder="ex: Chemise Sézane Verte"
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="description">Décris ton article</label>
                <textarea
                  id="description"
                  type="text"
                  required
                  placeholder="ex: Porté quelques fois, taille correctement"
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="brand">Marque</label>
                <textarea
                  id="brand"
                  type="text"
                  required
                  placeholder="ex: Zara"
                  onChange={(event) => {
                    setBrand(event.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="size">Taille</label>
                <textarea
                  id="size"
                  type="text"
                  required
                  placeholder="ex: L/40/12"
                  onChange={(event) => {
                    setSize(event.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="color">Couleur</label>
                <textarea
                  id="color"
                  type="text"
                  required
                  placeholder="ex: Fushia"
                  onChange={(event) => {
                    setColor(event.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="condition">État</label>
                <textarea
                  id="condition"
                  type="text"
                  required
                  placeholder="Neuf avec étiquette"
                  onChange={(event) => {
                    setCondition(event.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="location">Lieu</label>
                <textarea
                  id="location"
                  type="text"
                  required
                  placeholder="ex: Paris"
                  onChange={(event) => {
                    setLocation(event.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="price">Prix</label>
                <input
                  id="price"
                  type="text"
                  name="price"
                  required
                  placeholder="0,00€"
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
              </div>
              <div className="checkbox">
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
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
