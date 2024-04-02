import { Range, getTrackBackground } from "react-range";

const RangeInput = ({ range, setRange }) => {
  return (
    <>
      <div className="range">
        <p>Prix entre : </p>
        <Range
          step={1}
          min={0}
          max={500}
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
                  height: "3px",
                  width: "100%",
                  background: getTrackBackground({
                    values: range,
                    colors: ["#ccc", "#2cb1ba", "#ccc"],
                    min: 0,
                    max: 500,
                  }),
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
                  height: "15px",
                  width: "15px",
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
