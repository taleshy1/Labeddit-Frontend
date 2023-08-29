import { BigInput } from "../../components/bigInput";
import { CommomButton } from "../../components/commonButton";
import { ContentBox } from "../../components/contentBox";
import { Header } from "../../components/header";
import { PostInterface, useForms } from "../../hooks/useForms/useForms";
import { useState } from "react"
import { useSecure } from "../../hooks/useSecure/useSecure"
export function Feed() {
  useSecure()
  const [posts, setPosts] = useState([{
    name: "Tales",
    content: "Porque a maioria dos desenvolvedores usam Linux? ou as empresas de tecnologia usam Linux ?",
    likeQuantity: 102893273,
    commentQuantity: 102893273
  },
  {
    name: "Breon",
    content: "Memória de vídeo insuficiente",
    likeQuantity: 12,
    commentQuantity: 12
  },
  {
    name: "JenJen",
    content: "Falso",
    likeQuantity: 123,
  }])
  const post: PostInterface = {
    post: ""
  }
  const { changeInput, clear, input } = useForms(post)

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="flex flex-col items-center ">
        <form onSubmit={clear} className="flex flex-col items-center justify-center mt-8">
          <div className=" flex flex-col gap-3 w-[22.5rem]">
            <BigInput placeHolder="Escreva seu post..." name="post" value={"post" in input ? input["post"] : ""} onChange={changeInput} />
            <CommomButton fill={true} text="Postar" type="submit" />
            <div className=" mt-3 mb-[1.63rem] h-px bg-gradient-to-r from-[#FF6489] to-[#F9B24E] " />
          </div>
        </form>

        <div className="gap-3 flex flex-col w-[22.5rem] mb-5">
          {posts.map(p => <ContentBox content={p.content} name={p.name} likeQuantity={p.likeQuantity} commentQuantity={p.commentQuantity} />)}
        </div>
      </main>
    </>
  )
}