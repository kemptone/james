import { useId } from "preact/hooks";
import { forwardRef, Ref } from "preact/compat";

export default (props: {
  onInput: (e: Event) => void;
  inputRef?: Ref<HTMLInputElement>;
  legendText: string;
}) => {
  const markersId = useId();

  return (
    <fieldset className="range-with-ticks">
      <legend>
        {props.legendText}
      </legend>
      <input
        type="range"
        list={ markersId }
        ref={props.inputRef}
        onInput={props.onInput}
      />
      <datalist id={ markersId }>
        <option value="0"></option>
        <option value="25"></option>
        <option value="50"></option>
        <option value="75"></option>
        <option value="100"></option>
      </datalist>
    </fieldset>
  );
};
