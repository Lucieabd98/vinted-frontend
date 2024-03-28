import logovinted from "../imgs/vinted-logo.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ token, handleToken }) => {
  console.log(token);
  return (
    <>
      <header>
        <div className="container">
          <Link to={"/"}>
            <div>
              <img src={logovinted} alt="logo vinted" />
            </div>
          </Link>

          <div>
            <input
              type="text"
              placeholder="Recherche des articles"
              name="recherche"
            ></input>
          </div>

          {!token ? (
            <>
              <div className="right-buttons">
                <Link to={"/signup"}>
                  <button>S'inscrire</button>
                </Link>
                <Link to={"/login"}>
                  <button>Se connecter</button>
                </Link>
              </div>
            </>
          ) : (
            <div>
              <button
                className="deconnect"
                onClick={() => {
                  handleToken(null);
                }}
              >
                Se déconnecter
              </button>
            </div>
          )}

          <button className="sell">Vends tes articles</button>
        </div>
      </header>
    </>
  );
};

export default Header;
