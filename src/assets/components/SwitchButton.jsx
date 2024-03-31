import Switch from "react-switch";

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
          handleDiameter={22}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={22}
          width={48}
        />
      </div>
    </>
  );
};

export default SwitchButton;
