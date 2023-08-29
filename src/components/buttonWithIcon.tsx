import { ReactNode } from "react"

interface Props {
  children: ReactNode
}
export function ButtonWithIcon({ children }: Props) {
  return (
    <button>{children}</button>
  )
}