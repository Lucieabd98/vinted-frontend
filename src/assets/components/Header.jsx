import logovinted from "../imgs/vinted-logo.png";
import { Link } from "react-router-dom";

const Header = () => {
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

          <div className="right-buttons">
            <Link to={"/signup"}>
              <button>S'inscrire</button>
            </Link>
            <Link to={"/login"}>
              <button>Se connecter</button>
            </Link>
          </div>
          <button className="sell">Vends tes articles</button>
        </div>
      </header>
    </>
  );
};

export default Header;
