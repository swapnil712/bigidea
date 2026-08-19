import { IconType } from "react-icons";
import { baseStyle } from "@/constants/styles";
import { OptionType } from "@/constants/choices";
import { MdOutlineCloudUpload } from "react-icons/md";
import { getRows } from "@/functions/getRows";

type InputSize = "S" | "L" | "G";

type InputFieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "file"
  | "textarea"
  | "select";

interface InputProps {
  type?: InputFieldType;
  id: string,
  size?: InputSize;
  active?: boolean;
  label?: string;
  hint?: string;
  rows?: number,
  options?: OptionType[];
  leftIcon?: IconType;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  // Sizes to its own content instead of sharing the row evenly, so a select
  // sitting next to a text field only takes the width its options need.
  fit?: boolean;
  value?: string | number;
  onChange?: (value: string) => void;
  onClick?: () => void;
}

const sizeStyles: Record<InputSize, string> = {
  S: "",
  L: "p-2",
  G: ""
};

export const Input = ({
  type = "text",
  size,
  id,
  suffix,
  label,
  rows,
  hint,
  leftIcon,
  prefix,
  options,
  placeholder,
  fit,
  value,
  onChange,
}: InputProps) => {
  const isSize = size || "L";
  const Icon = leftIcon;

  const wrapLines = size === "G" ? "text-md border-transparent hover:border-zinc-700 group-focus-within:border-zinc-500" : "border-color group-focus-within:border-zinc-400!"

  const wrapperStyle = `${ wrapLines } ${ sizeStyles[isSize] } p-1 border-1 flex flex-row items-center rounded-sm text-md ${ fit ? "" : "grow" } gap-1`;
  const preSuf = "text-sm opacity-50";


  const sharedInputProps = {
    placeholder,
    defaultValue: value,
    id,
    className: `outline-0 text-sm ${ fit ? "w-auto" : "w-full" }`,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => onChange?.(e.target.value),
  };



  let renderable;

  switch (type) {
    case "textarea":
      renderable = <textarea rows={ getRows( value as string ) || rows } {...sharedInputProps} />;
      break;
    case "select":
      renderable = (
        <select {...sharedInputProps}>
          {options &&
            options.map((item) => (
              <option value={item.id} key={item.id}>
                {item.label}
              </option>
            ))}
        </select>
      );
      break;
    default:
      renderable = (
        <>
          {prefix && <span className={preSuf}>{prefix}</span>}
          {Icon && <Icon size={isSize === "L" ? 20 : 16} />}

          <input type={type} {...sharedInputProps} />

          {suffix && <span className={preSuf}>{suffix}</span>}
          { type==="file" && <MdOutlineCloudUpload size={isSize === "L" ? 20 : 16} />}
        </>
      );
      break;
  }

  return (
    <div className={`${baseStyle.inlineCol} group gap-1! ${ fit ? "w-auto shrink-0" : "grow w-full" }`}>

      {label && (
        <label htmlFor={ id } className={baseStyle.inlineRow}>
          <span className="text-sm opacity-80">{label}</span>
          {hint && <span className={ preSuf }>{hint}</span>}
        </label>
      )}

      <div className={`${wrapperStyle} flex flex-row ${ fit ? "" : "w-full" }`}>{renderable}</div>

    </div>
  );
};