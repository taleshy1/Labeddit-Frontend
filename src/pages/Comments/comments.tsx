import { BigInput } from "../../components/bigInput";
import { CommomButton } from "../../components/commonButton";
import { ContentBox } from "../../components/contentBox";
import { Header } from "../../components/header";
import { PostInterface, useForms } from "../../hooks/useForms/useForms";
import { useState } from "react"
import { useSecure } from "../../hooks/useSecure/useSecure";

export function CommentsPage() {
  useSecure()
  const [comments, setComments] = useState([{
    name: "ALGM DA REUNIAO",
    content: "O cara é pobre kkkkkk",
    likeQuantity: 102,
  },
  {
    name: "Tales",
    content: "fecha o discord",
    likeQuantity: 12,
  },
  {
    name: "Lucas",
    content: "ALGO CRIMINOSO",
    likeQuantity: 666,
  }, {
    name: "ALGM DA REUNIAO",
    content: "O cara é pobre kkkkkk",
    likeQuantity: 102,
  },
  {
    name: "Tales",
    content: "fecha o discord",
    likeQuantity: 12,
  },
  {
    name: "Lucas",
    content: "ALGO CRIMINOSO",
    likeQuantity: 666,
  }])

  const postContent: { name: string, content: string, likeQuantity: number, commentQuantity: number } = {
    name: "Breon",
    content: "Memória de vídeo insuficiente",
    likeQuantity: 12,
    commentQuantity: 12
  }
  const comment: PostInterface = {
    post: ""
  }


  const { changeInput, clear, input } = useForms(comment)
  return (
    <>
      <header>
        <Header />
      </header>
      <main className="flex flex-col items-center ">
        <div className=" flex flex-col w-[22.5rem] mt-8">

          <ContentBox content={postContent.content} likeQuantity={postContent.likeQuantity} name={postContent.name} commentQuantity={postContent.commentQuantity} />
        </div>
        <form onSubmit={clear} className="flex flex-col items-center justify-center mt-8">


          <div className=" flex flex-col gap-3 w-[22.5rem]">
            <BigInput placeHolder="Adicionar comentário" name="post" value={"post" in input ? input["post"] : ""} onChange={changeInput} />
            <CommomButton fill={true} text="Responder" type="submit" />
            <div className=" mt-3 mb-[1.63rem] h-px bg-gradient-to-r from-[#FF6489] to-[#F9B24E] " />
          </div>
        </form>

        <div className="gap-3 flex flex-col w-[22.5rem] mb-5">
          {comments.map(p => <ContentBox content={p.content} name={p.name} likeQuantity={p.likeQuantity} />)}
        </div>
      </main>
    </>
  )
}