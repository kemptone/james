import { MutableRef } from "preact/hooks";

export const SettingItem = ({
  name,
  type = "number",
  inputRef,
  onInput,
}: {
  name: string;
  type?: "number" | "text";
  inputRef?: MutableRef<HTMLInputElement | null>;
  onInput?: (e: InputEvent) => void;
}) => {
  return (
    <label class="setting-item">
      <span>{name}</span>
      <input
        name={name}
        type={type}
        step={type === "number" ? "0.001" : undefined}
        ref={inputRef}
        onInput={onInput}
      />
    </label>
  );
};
