import { FunctionComponent } from "preact/compat";

interface FanProps {
  bladeCount: number;
  stroke?: string;
  fill?: string;
}

export const CurveTypes = {
  "Bulb": "c -10 30, 50 30, 40 0",
  "Flat": "c 0 30, 40 30, 40 0",
  "Flat2": "c 0 10, 40 30, 10 0",
};

export const WidthTypes = {
  "Main": "h -20",
  "Skinny": "h -10",
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
        d={`M 130 260
        ${CurveTypes.Flat}
        l -10 -110
        ${WidthTypes.Main}
        Z
        `}
        fill={fill}
        stroke={stroke}
        transform={`rotate(${rotation}, 150, 150)`}
      />
    </>
  );
}

const AdjustableBlades: FunctionComponent<FanProps> = ({
  bladeCount = 5,
  stroke,
  fill,
}) => {
  const Arr: number[] = [];

  for (let x = 0; x < bladeCount; x++) {
    Arr.push(x * (360 / bladeCount));
  }

  return (
    // <div className="blades-wrap">
    <svg
      width="300"
      height="300"
      className="blades"
    >
      {Arr.map((r) => {
        return <Blade1 rotation={r} key={r} stroke={stroke} fill={fill} />;
      })}
      <circle r="31" cx="150" cy="150" fill="black" />
      <circle r="30" cx="150" cy="150" fill="white" />
    </svg>
    // </div>
  );
};

export default AdjustableBlades;
