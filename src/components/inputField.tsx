
interface Props {
  type: string;
  name: string;
  placeHolder: string;
  autocomplete: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputField({ name, type, placeHolder, autocomplete, value, onChange }: Props) {

  return (
    <>
      <input
        type={type}
        name={name}
        placeholder={placeHolder}
        autoComplete={autocomplete}
        className="
          border
          border-gray-border
          rounded 
          w-[22.6875rem]
          h-[3.75rem]
          mb-[0.5rem]
          placeholder:text-[#323941]
          pl-6
        "
        value={value}
        onChange={onChange}
      />
    </>
  );
}
