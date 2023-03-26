import { FunctionComponent } from "preact/compat";

export const CurveTypes = {
  "funk": "m 172 192 l -24 118 q 31 15 64 0 l -24 -118 z",
  "funk2": "m 14 15 q 0 5 -2 10 q 3 2 6 0 q -2 -5 -2 -10 z", // 60 x 60
};

function Blade1({
  rotation = 0,
  backgroundBlade,
}: {
  rotation: number;
  backgroundBlade: boolean;
}) {
  return (
    <>
      <path
        d={CurveTypes.funk2}
        class={backgroundBlade ? "background-blade" : "forground-blade"}
        transform={`rotate(${rotation}, 15, 15)`}
      />
    </>
  );
}

interface FanProps {
  bladeCount: number;
}

const AdjustableBlades: FunctionComponent<FanProps> = ({
  bladeCount = 5,
}) => {
  const Arr: number[] = [];

  for (let x = 0; x < bladeCount; x++) {
    Arr.push(x * (360 / bladeCount));
  }

  return (
    <svg
      width="30"
      height="30"
      className="blades"
    >
      { bladeCount > 500 ? null :
      Arr.map((r, index, arr) => {
        return (
          <Blade1
            rotation={r}
            key={r}
            backgroundBlade={true}
          />
        );
      }) }

      { Arr.map((r) => {
          return (
            <Blade1
              rotation={r}
              key={"added" + r}
              backgroundBlade={false}
            />
          );
        }) }

      {/* <circle r="31" cx="150" cy="150" fill="black" /> */}
      {/* <circle r="30" cx="150" cy="150" fill="white" /> */}
    </svg>
  );
};

export default AdjustableBlades;
