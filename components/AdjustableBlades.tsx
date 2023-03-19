import { FunctionComponent } from "preact/compat";

interface FanProps {
  bladeCount: number;
}

function Blade1({
  rotation = 0,
}: {
  rotation: number;
}) {
  return (
    <>
      <path
        d="M 180 310
        c 0 30, 50 32, 40 0
        l -10 -110
        h -20
        Z
        "
        fill="black"
        transform={`rotate(${rotation}, 200, 200)`}
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
      width="400"
      height="400"
      className="blades"
    >
      {Arr.map((r) => {
        return <Blade1 rotation={r} key={r} />;
      })}
      <circle r="31" cx="200" cy="200" fill="black" />
      <circle r="30" cx="200" cy="200" fill="white" />
    </svg>
    // </div>
  );
};

export default AdjustableBlades;
