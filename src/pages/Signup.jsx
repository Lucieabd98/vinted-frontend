// import axios from "axios";
import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <form className="sign-up">
        <h2>S'inscrire</h2>
        <input type="text" placeholder="Nom d'utilisateur" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Mot de passe" />
        <div className="newsletter ">
          <div className="newsletter-checkbox">
            <input type="checkbox" name="newseltter" />
            <p>S'inscrire à notre newsletter</p>
          </div>
          <p className="conditions">
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>
        <div className="button-signup">
          <button type="submit" className="signup">
            S'inscrire
          </button>
          <Link className="to-login" to={"/login"}>
            Tu as déjà un compte ? Connecte-toi{" "}
          </Link>
        </div>
      </form>
    </>
  );
};

export default Signup;
