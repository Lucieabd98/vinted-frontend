import { Range } from "react-range";

const RangeInput = ({ range, setRange }) => {
  return (
    <>
      <div className="range">
        <p>Prix entre : </p>
        <Range
          step={1}
          min={0}
          max={300}
          values={range}
          onChange={(values) => setRange(values)}
          onFinalChange={(values) => setRange(values)}
          renderTrack={({ props, children }) => (
            <>
              <p>{range[0]}€</p>
              <div
                ref={props.ref}
                {...props}
                style={{
                  ...props.style,
                  height: "4px",
                  width: "100%",
                  backgroundColor: "#ccc",
                  color: "#2cb1ba",
                }}
              >
                {children}
              </div>
              <p>{range[1]}€</p>
            </>
          )}
          renderThumb={({ props }) => (
            <>
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "20px",
                  width: "20px",
                  backgroundColor: "#2cb1ba",
                  borderRadius: "50%",
                }}
              />
            </>
          )}
        />
      </div>
    </>
  );
};

export default RangeInput;
