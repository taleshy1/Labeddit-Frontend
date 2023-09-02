import { useState, useEffect, useCallback } from "react";
import { useForms } from "../../hooks/useForms/useForms";
import { useSecure } from "../../hooks/useSecure/useSecure";
import {
  GetPostInterface,
  createAPost,
  feedServiceGetPosts,
  likeOrDislikeApost,
} from "../../services/feedServices";
import { goToPostComments } from "../../router/coordinator";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { BigInput } from "../../components/BigInput";
import { CommomButton } from "../../components/CommonButton";
import { ModalError } from "../../components/ModalError";
import { ContentBox } from "../../components/ContentBox";

export function Feed() {
  useSecure();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<GetPostInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [postOwner, setPostOwner] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { changeInput, clear, input } = useForms({ post: "" });
  const token = localStorage.getItem("tokenAcess");

  const getPosts = useCallback(async () => {
    try {
      const axiosHeaders = { headers: { Authorization: token } };
      const allPosts = await feedServiceGetPosts(axiosHeaders);
      setPosts(allPosts || []);
    } catch (error) {
      console.error("Erro ao obter os posts:", error);
    }
  }, [token]);

  const createPost = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        const axiosHeaders = { headers: { Authorization: token } };
        const axiosBody = { content: "post" in input ? input["post"] : "" };

        await createAPost(axiosHeaders, axiosBody);

        clear(e);
        getPosts();
      } catch (error) {
        setErrorMessage("Escreva algo na caixa para postar");
        setPostOwner(true);
        setModalOpen(true);
      }
    },
    [input, token, clear, getPosts]
  );

  const commentButtonFunction = (postId: string) => {
    goToPostComments(navigate, postId);
  };

  const likeButtonFunction = useCallback(
    async (postId: string, value: boolean) => {
      const axiosBody = { like: value };
      const axiosHeaders = { headers: { Authorization: token } };

      try {
        await likeOrDislikeApost(axiosHeaders, axiosBody, postId);
        getPosts();
      } catch (error) {
        if (
          error ===
          "O criador do post não pode dar like/dislike em seu proprio post"
        ) {
          setErrorMessage(error);
          setPostOwner(true);
          setModalOpen(true);
        } else {
          setErrorMessage("Ocorreu um erro inesperado");
          setModalOpen(true);
        }
      }
    },
    [token, getPosts]
  );

  useEffect(() => {
    getPosts().finally(() => {
      setLoading(false);
      setPostOwner(false);
    });
  }, [getPosts]);

  const closeModal = () => {
    setModalOpen(false);
    setPostOwner(false);
  };

  if (loading) {
    return <h1>Carregando</h1>;
  }

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="flex flex-col items-center">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            createPost(event);
          }}
          className="flex flex-col items-center justify-center mt-8"
        >
          <div className="flex flex-col gap-3 w-[22.5rem]">
            <BigInput
              placeHolder="Escreva seu post..."
              name="post"
              value={"post" in input ? input["post"] : ""}
              onChange={changeInput}
            />
            <CommomButton fill={true} text="Postar" type="submit" />
            <div className="mt-3 mb-[1.63rem] h-px bg-gradient-to-r from-[#FF6489] to-[#F9B24E]" />
          </div>
        </form>
        {postOwner && (
          <ModalError
            open={modalOpen}
            onClose={closeModal}
            text={errorMessage}
          />
        )}
        <div className="gap-3 flex flex-col-reverse w-[22.5rem] mb-5">
          {posts.map((post) => (
            <ContentBox
              content={post.content}
              name={post.creator.name}
              likeQuantity={post.likes - post.dislikes}
              commentQuantity={post.comments}
              key={post.id}
              postId={post.id}
              userLiked={post.userLiked}
              goTocommentsFunction={commentButtonFunction}
              likeOrDislikeFunction={likeButtonFunction}
            />
          ))}
        </div>
      </main>
    </>
  );
}
