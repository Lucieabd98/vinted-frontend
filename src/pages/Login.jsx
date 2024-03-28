import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const Login = ({ handleToken }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  console.log(email);
  const [password, setPassword] = useState("");
  console.log(password);

  const handleSubmit = async (event) => {
    console.log("soumission du formulaire");
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://site--backend-vinted--txtnrrwcytwl.code.run/user/login",
        {
          email,
          password,
        }
      );
      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="login" onSubmit={handleSubmit}>
        <h2>Se connecter </h2>
        <input
          name={email}
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          name={password}
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div className="button-login">
          <button type="submit">Se connecter</button>
          <Link className="to-signup" to={"/signup"}>
            Pas encore de compte ? Inscris-toi !
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
