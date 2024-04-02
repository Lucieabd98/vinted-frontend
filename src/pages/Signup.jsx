import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ handleToken, setToHide }) => {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [newsletter, setNewsletter] = useState(false);

  const [errorInput, setErrorInput] = useState("");

  const handleSumbit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://site--backend-vinted--txtnrrwcytwl.code.run/user/signup",
        {
          username,
          email,
          password,
          newsletter,
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
      <form className="sign-up" onSubmit={handleSumbit}>
        <h2>S'inscrire</h2>
        <input
          name={username}
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
        <input
          name={email}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div className="newsletter ">
          <div className="newsletter-checkbox">
            <input
              type="checkbox"
              name="newseltter"
              onChange={() => {
                setNewsletter(!newsletter);
              }}
            />
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
            Tu as déjà un compte ? Connecte-toi
          </Link>
        </div>
      </form>
      {errorInput === "Request failed with status code 409" && (
        <p className="errormessage container">L'email a déjà été utilisé.</p>
      )}
      {errorInput === "Request failed with status code 400" && (
        <p className="errormessage container">
          Le nom d'utilisateur est obligatoire.
        </p>
      )}
    </>
  );
};

export default Signup;
