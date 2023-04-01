import { useId, useRef } from "preact/hooks";
import { forwardRef, Ref } from "preact/compat";

// creates as simple array from 1 to 10
const range = Array.from({ length: 10 }, (_, i) => i);

type OnInputType = Event & { currentTarget: HTMLInputElement };

export default (props: {
  // onInput: (e: Event & { currentTarget: HTMLInputElement }) => void;
  onInput: (e: OnInputType) => void;
  inputRef?: Ref<HTMLInputElement>;
  legendText: string;
}) => {
  const markersId = useId();
  const r_value = useRef<HTMLElement | null>(null);

  return (
    <fieldset className="range-with-ticks">
      <legend>
        {props.legendText}
        <code ref={r_value} style={{ padding: "0 .5em" }} />
      </legend>
      <input
        type="range"
        list={markersId}
        ref={props.inputRef}
        onInput={(e: OnInputType) => {
          props.onInput(e);
          if (r_value.current) {
            r_value.current.innerText = e.currentTarget.value;
          }
        }}
        step="0.001"
      />
      <datalist id={markersId}>
        {range.map((i) => <option key={i} value={i * 10} />)}
      </datalist>
    </fieldset>
  );
};
