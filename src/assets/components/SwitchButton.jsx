import Switch from "react-switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL } from "@fortawesome/free-solid-svg-icons";
const arrowDown = <FontAwesomeIcon icon="arrow-down" />;
const arrowUp = <FontAwesomeIcon icon="arrow-up" />;

const SwitchButton = ({ sortPrice, setSortPrice }) => {
  return (
    <>
      <div className="switch">
        <p>Trier par prix : </p>
        <Switch
          onChange={() => {
            setSortPrice(!sortPrice);
          }}
          checked={sortPrice}
          onColor="#2cb1ba"
          handleDiameter={20}
          uncheckedIcon={false}
          checkedIcon={false}
          // checkedHandleIcon={arrowDown}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={18}
          width={45}
          checkedHandleIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                color: "#888888",
                fontSize: 18,
              }}
            >
              {arrowDown}
            </div>
          }
          uncheckedHandleIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                color: "#2cb1ba",
                fontSize: 18,
              }}
            >
              {arrowUp}
            </div>
          }
        />
      </div>
    </>
  );
};

export default SwitchButton;
