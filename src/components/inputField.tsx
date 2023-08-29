import icon from "../assets/infoIcon.svg"
interface Props {
  type: string;
  name: string;
  placeHolder: string;
  autocomplete: string;
  value: string;
  isValid?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputField({ name, type, placeHolder, autocomplete, value, onChange, isValid }: Props) {
  return (
    <div className="flex h-[3.75rem] relative">
      <input
        type={type}
        name={name}
        placeholder={placeHolder}
        autoComplete={autocomplete}
        className={`
      ${!isValid ? "border-red-500 relative" : ""}
      border
      border-gray-border
      rounded 
      w-[22.6875rem]
      mb-[0.5rem]
      placeholder:text-[#323941]
      pl-6
      `}
        value={value}
        onChange={onChange}
      />
      {!isValid && <img src={icon} alt="" className="absolute right-2 top-3 h-3/6 w-8" />}

    </div>
  );
}
