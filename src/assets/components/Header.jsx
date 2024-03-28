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
            <button>S'inscrire</button>
            <button>Se connecter</button>
          </div>
          <button className="sell">Vends tes articles</button>
        </div>
      </header>
    </>
  );
};

export default Header;
