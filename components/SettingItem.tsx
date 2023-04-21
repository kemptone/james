import { MutableRef } from "preact/hooks";
import { HTMLAttributes } from "preact/compat";

// NOTES on Event Handlers
// the onInput event handler type can also be created this way
// import { ChangeEventHandler, forwardRef, Ref } from "preact/compat";
// onInput?: ChangeEventHandler<HTMLInputElement>; // it also works
// Using Ref instead of MutableRef also works
// inputRef?: Ref<HTMLInputElement>; // also works

export const SettingItem = ({
  name = "",
  type = "number",
  inputRef,
  onInput,
  defaultChecked,
  defaultValue,
  step: _step,
}:
  & Pick<
    HTMLAttributes<HTMLInputElement>,
    "onInput" | "type" | "defaultValue" | "defaultChecked" | "step"
  >
  & {
    inputRef?: MutableRef<HTMLInputElement | null>;
    name: string;
  }) => {
  const step = _step ? _step : type === "number" ? "0.001" : undefined;
  const clean_name = name.replace(/_/g, " ");
  return (
    <label class="setting-item">
      <span>{clean_name}</span>
      <input
        {...{ name, type, onInput, step, defaultChecked, defaultValue }}
        ref={inputRef}
      />
    </label>
  );
};
