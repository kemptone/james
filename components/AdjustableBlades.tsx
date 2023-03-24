import { FunctionComponent } from "preact/compat";

export const CurveTypes = {
  "funk": "m 172 192 l -24 118 q 31 15 64 0 l -24 -118 z"
};

function Blade1({
  rotation = 0,
  stroke,
  fill = "black",
}: {
  rotation: number;
  stroke?: string;
  fill?: string;
}) {
  return (
    <>
      <path
        d={CurveTypes.funk}
        fill={fill}
        stroke={stroke}
        strokeWidth=".5"
        transform={`rotate(${rotation}, 180, 180)`}
      />
    </>
  );
}

interface FanProps {
  bladeCount: number;
  stroke?: string;
  fill?: string;
  addedLines?: boolean;
}

const AdjustableBlades: FunctionComponent<FanProps> = ({
  bladeCount = 5,
  stroke = "white",
  fill = "black",
  addedLines,
}) => {
  const Arr: number[] = [];

  for (let x = 0; x < bladeCount; x++) {
    Arr.push(x * (360 / bladeCount));
  }

  return (
    // <div className="blades-wrap">
    <svg
      width="360"
      height="360"
      className="blades"
    >
      {Arr.map((r, index, arr) => {
        return (
          <Blade1
            rotation={r}
            key={r}
            stroke={addedLines ? "none" : stroke}
            fill={fill}
          />
        );
      })}
      {Arr[Arr.length - 1]
        ? (
          <Blade1
            rotation={Arr[Arr.length - 1]}
            key={"extra"}
            stroke={stroke}
            fill={"none"}
          />
        )
        : null}

      {addedLines
        ? Arr.map((r) => {
          return <Blade1 rotation={r} key={r} stroke={"white"} fill={"none"} />;
        })
        : null}

      {/* <circle r="31" cx="150" cy="150" fill="black" /> */}
      {/* <circle r="30" cx="150" cy="150" fill="white" /> */}
    </svg>
    // </div>
  );
};

export default AdjustableBlades;
