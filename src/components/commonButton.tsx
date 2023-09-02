interface Button {
  text: string
  fill: boolean,
  type: "button" | "submit" | "reset" | undefined
  action?: React.MouseEventHandler<HTMLButtonElement>
}

export function CommomButton({ text, fill, type, action }: Button) {
  return (
    <button className={`
    ${fill ?
        'text-white bg-gradient-to-r from-[#FF6489] to-[#F9B24E]'
        :
        'text-orange border border-[#FE7E02]'}
        text-lg font-sans rounded-3xl py-3`}
      type={type}
      onClick={action && action}
    >
      {text}
    </button>
  )
}
