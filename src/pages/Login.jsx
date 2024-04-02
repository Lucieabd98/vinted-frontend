import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const Login = ({ handleToken, setToHide }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorInput, setErrorInput] = useState("");

  const handleSubmit = async (event) => {
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
      setToHide(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setErrorInput(error.message);
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
      {errorInput === "Request failed with status code 400" && (
        <p className="errormessage container">
          L'email ou le mot de passe sont incorrects.
        </p>
      )}
      {errorInput === "Request failed with status code 500" && (
        <p className="errormessage container">
          L'email ou le mot de passe sont incorrects.
        </p>
      )}
    </>
  );
};

export default Login;
