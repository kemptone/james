import Preact from "preact";
import { FunctionComponent } from "preact/compat";
import { useEffect, useRef, useState } from "preact/hooks";

interface FanProps {
  blades: number;
  radius: number;
  speed: number;
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

const BLADES_COUNT = 5;
const Arr: number[] = [];

for (let x = 0; x < BLADES_COUNT; x++) {
  Arr.push(x * (360 / BLADES_COUNT));
}

const Fan: FunctionComponent<FanProps> = ({}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [arr, setArr] = useState<number[]>([...Arr]);

  useEffect(() => {
    svgRef.current?.classList.add("rotate");
    inputRef.current.value = BLADES_COUNT;
  }, []);

  return (
    <>
      <div>
        <div className="blades-wrap">
          <svg
            width="400"
            height="400"
            className="blades"
            ref={svgRef}
          >
            {arr.map((r) => {
              return <Blade1 rotation={r} key={r} />;
            })}
            {/* <Blade1 rotation="0" /> */}
            {/* <Blade1 rotation="90" /> */}
            {/* <Blade1 rotation="180" /> */}
            {/* <Blade1 rotation="270" /> */}
            <circle r="31" cx="200" cy="200" fill="black" />
            <circle r="30" cx="200" cy="200" fill="white" />
          </svg>
        </div>
        <div className="blade-count">
          <input
            type="number"
            ref={inputRef}
            onChange={(e: Event) => {
              const target = e.currentTarget as HTMLInputElement;
              const count = Math.min(Math.ceil(Number(target.value)), 350);
              const Arr = [];

              for (let x = 0; x < count; x++) {
                Arr.push(x * (360 / count));
              }

              setArr(Arr);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Fan;
