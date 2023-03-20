import { FunctionComponent } from "preact/compat";

interface FanProps {
  bladeCount: number;
  stroke?: string;
  fill?: string;
}

function Blade1({
  rotation = 0,
}: {
  rotation: number;
}) {
  return (
    <>
      <path
        d="M 130 260
        c -10 30, 50 30, 40 0
        l -10 -110
        h -20
        Z
        "
        fill="black"
        stroke="white"
        transform={`rotate(${rotation}, 150, 150)`}
      />
    </>
  );
}

const AdjustableBlades: FunctionComponent<FanProps> = ({
  bladeCount = 5,
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
        return <Blade1 rotation={r} key={r} />;
      })}
      <circle r="31" cx="150" cy="150" fill="black" />
      <circle r="30" cx="150" cy="150" fill="white" />
    </svg>
    // </div>
  );
};

export default AdjustableBlades;
