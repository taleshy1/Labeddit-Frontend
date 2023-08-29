import down from "../assets/down.svg"
import { ButtonWithIcon } from "./buttonWithIcon"
import up from "../assets/up.svg"
import comments from "../assets/comments.svg"

interface Props {
  name: string,
  content: string,
  likeQuantity: number,
  commentQuantity?: number
}
export function ContentBox({ name, content, likeQuantity, commentQuantity }: Props) {
  return (
    <div className=" h-fit px-2.5 py-2 bg-neutral-50 rounded-xl border border-neutral-200 flex-col justify-start items-start gap-3 inline-flex">
      <p className="text-center text-neutral-500 text-xs font-normal">Enviado por: {name}</p>
      <p>{content}</p>
      <div className="flex gap-[0.69rem] ">
        <div className="flex gap-[0.4rem] rounded-3xl border border-gray-200 items-center p-1">
          <ButtonWithIcon ><img src={up} alt="Dislike" /></ButtonWithIcon>
          <p className="text-neutral-500 text-xs font-bold">{likeQuantity}</p>
          <ButtonWithIcon ><img src={down} alt="Dislike" /></ButtonWithIcon>
        </div>
        {commentQuantity && <div className="flex rounded-3xl border border-gray-200 p-2 gap-3 items-center" >
          <ButtonWithIcon ><img src={comments} alt="Dislike" /></ButtonWithIcon>
          <p className="text-neutral-500 text-xs font-bold">{commentQuantity}</p>
        </div>}
      </div>
    </div>
  )
}