import { FunctionComponent } from "preact/compat";

export const CurveTypes = {
  "funk": "m 172 192 l -24 118 q 31 15 64 0 l -24 -118 z",
  "funk2" : "m 14 15 q 0 5 -2 10 q 3 2 6 0 q -2 -5 -2 -10 z" // 60 x 60
};

function Blade1({
  rotation = 0,
  stroke,
  fill = "black",
  strokeWidth = 0.02,
  noFill,
  noStroke,
}: {
  rotation: number;
  stroke?: string;
  fill?: string;
  noFill? : boolean
  noStroke? : boolean
  strokeWidth? : number
}) {

  // console.log({
  //   strokeWidth
  // })

  return (
    <>
      <path
        d={CurveTypes.funk2}
        fill={ noFill ? "none" : fill}
        stroke={ noStroke ? "none" : stroke}
        strokeWidth={ `${ strokeWidth }` }
        transform={`rotate(${rotation}, 15, 15)`}
      />
    </>
  );
}

interface FanProps {
  bladeCount: number;
  stroke?: string;
  fill?: string;
  addedLines?: boolean;
  strokeWidth?: number;
}

const AdjustableBlades: FunctionComponent<FanProps> = ({
  bladeCount = 5,
  stroke = "white",
  fill = "black",
  strokeWidth,
  addedLines,
}) => {
  const Arr: number[] = [];

  for (let x = 0; x < bladeCount; x++) {
    Arr.push(x * (360 / bladeCount));
  }

  return (
    // <div className="blades-wrap">
    <svg
      width="30"
      height="30"
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
            fill={"none"}
            noStroke
            noFill
          />
        )
        : null}

      {addedLines
        ? Arr.map((r) => {
          return <Blade1 noFill rotation={r} key={r} stroke={"white"} fill={"none"} />;
        })
        : null}

      {/* <circle r="31" cx="150" cy="150" fill="black" /> */}
      {/* <circle r="30" cx="150" cy="150" fill="white" /> */}
    </svg>
    // </div>
  );
};

export default AdjustableBlades;
