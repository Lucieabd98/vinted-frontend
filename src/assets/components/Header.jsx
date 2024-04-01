import logovinted from "../imgs/vinted-logo.png";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import RangeInput from "./RangeInput";
import SwitchButton from "./SwitchButton";

const Header = ({
  token,
  handleToken,
  input,
  setInput,
  range,
  setRange,
  sortPrice,
  setSortPrice,
  toHide,
  setToHide,
}) => {
  // console.log(token);
  const navigate = useNavigate();

  return (
    <>
      <header>
        <div className="container">
          <Link to={"/"}>
            <div
              onClick={() => {
                setToHide(false);
              }}
            >
              <img src={logovinted} alt="logo vinted" />
            </div>
          </Link>

          <div>
            <SearchInput input={input} setInput={setInput} />
            {toHide === false && (
              <div className="filters">
                <SwitchButton
                  sortPrice={sortPrice}
                  setSortPrice={setSortPrice}
                />
                <RangeInput range={range} setRange={setRange} />
              </div>
            )}
          </div>

          {!token ? (
            <>
              <div className="right-buttons">
                <Link to={"/signup"}>
                  <button
                    onClick={() => {
                      setToHide(true);
                    }}
                  >
                    S'inscrire
                  </button>
                </Link>
                <Link to={"/login"}>
                  <button
                    onClick={() => {
                      setToHide(true);
                    }}
                  >
                    Se connecter
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <div>
              <button
                className="deconnect"
                onClick={() => {
                  handleToken(null);
                  navigate("/");
                }}
              >
                Se déconnecter
              </button>
            </div>
          )}
          <Link to="/offer/publish">
            <button
              className="sell"
              onClick={() => {
                setToHide(true);
              }}
            >
              Vends tes articles
            </button>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
