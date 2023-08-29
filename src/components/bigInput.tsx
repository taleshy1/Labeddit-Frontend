interface Props {
  name: string;
  placeHolder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function BigInput({ name, placeHolder, value, onChange }: Props) {
  return (
    <textarea
      name={name}
      placeholder={placeHolder}
      className="p-4 h-32 bg-gray-200 rounded-xl resize-none"
      value={value}
      onChange={onChange}
      maxLength={400}
    />
  )
}
