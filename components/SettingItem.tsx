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
}:
  & Pick<
    HTMLAttributes<HTMLInputElement>,
    "onInput" | "type" | "defaultValue" | "defaultChecked"
  >
  & {
    inputRef?: MutableRef<HTMLInputElement | null>;
    name: string;
  }) => {
  const step = type === "number" ? "0.001" : undefined;
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
