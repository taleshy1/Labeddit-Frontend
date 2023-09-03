import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useForms, PostInterface } from "../../hooks/useForms/useForms";
import { useSecure } from "../../hooks/useSecure/useSecure";
import {
  createComment,
  getComments,
  getPostById,
  likeOrDislikeComment,
} from "../../services/commentsService";
import {
  GetPostInterface,
  likeOrDislikeApost,
} from "../../services/feedServices";
import { Header } from "../../components/Header";
import { ContentBox } from "../../components/ContentBox";
import { BigInput } from "../../components/BigInput";
import { CommomButton } from "../../components/CommonButton";
import { ModalError } from "../../components/ModalError";

const ERROR_POST_OWNER =
  "O criador do post não pode dar like/dislike em seu proprio post";
const ERROR_COMMENT_OWNER =
  "O criador não pode dar like/dislike em seu comentario";
const ERROR_EMPTY_INPUT = "O campo comentario está vazio";

interface Comment extends PostInterface {
  content: string;
  createdAt: string;
  creatorId: string;
  creatorName: string;
  dislike: number;
  id: string;
  like: number;
  userLiked?: number;
  postId: string;
  updatedAt: string;
}

interface PostData extends GetPostInterface {
  userLiked?: number;
}

export function CommentsPage() {
  useSecure();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<PostData | undefined>();
  const [commentOwner, setCommentOwner] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams<{ id: string }>();
  const token = localStorage.getItem("tokenAcess");
  const postId = id;

  const { changeInput, clear, input } = useForms({ post: "" });

  const fetchPostData = useCallback(async () => {
    const axiosHeaders = { headers: { Authorization: token } };
    const result = await getPostById(axiosHeaders, postId || "");
    setPost(result);
    setLoading(false);
  }, [postId, token]);

  const fetchCommentsData = useCallback(async () => {
    const axiosHeaders = { headers: { Authorization: token } };
    const result = await getComments(axiosHeaders, postId || "");
    setComments(result);
    setLoading(false);
  }, [postId, token]);

  const createNewComment = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const axiosHeaders = { headers: { Authorization: token } };
        const axiosBody = { content: "post" in input ? input["post"] : "" };

        await createComment(axiosBody, axiosHeaders, postId || "");
        clear(e);
        fetchPostData();
        fetchCommentsData();
      } catch (error) {
        if (typeof error === "object") {
          setCommentOwner(true);
          setModalOpen(true);
          setErrorMessage(ERROR_EMPTY_INPUT);
        }
      }
    },
    [input, token, postId, fetchCommentsData, clear, fetchPostData]
  );

  const handleLikeOrDislike = useCallback(
    async (postId: string, value: boolean, commentId?: string) => {
      try {
        const axiosHeaders = { headers: { Authorization: token } };
        const axiosBody = { like: value };

        await likeOrDislikeComment(
          axiosHeaders,
          axiosBody,
          postId,
          commentId || ""
        );
        fetchCommentsData();
      } catch (error) {
        if (error === ERROR_COMMENT_OWNER) {
          setCommentOwner(true);
          setModalOpen(true);
          setErrorMessage(error);
        }
      }
    },
    [token, fetchCommentsData]
  );

  const handleLikePostButton = useCallback(
    async (postId: string, value: boolean) => {
      const axiosBody = { like: value };
      const axiosHeaders = { headers: { Authorization: token } };

      try {
        await likeOrDislikeApost(axiosHeaders, axiosBody, postId);
        fetchPostData();
      } catch (error) {
        if (error === ERROR_POST_OWNER) {
          setCommentOwner(true);
          setModalOpen(true);
          setErrorMessage(error);
        }
      }
    },
    [token, fetchPostData]
  );

  const closeModal = () => {
    setModalOpen(false);
    setCommentOwner(false);
  };

  useEffect(() => {
    fetchPostData();
    fetchCommentsData();
  }, [fetchPostData, fetchCommentsData]);

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="flex flex-col items-center">
        {loading ? (
          <h1>Carregando</h1>
        ) : (
          <div className=" flex flex-col w-[22.5rem] mt-8">
            {commentOwner && (
              <ModalError
                open={modalOpen}
                onClose={closeModal}
                text={errorMessage}
              />
            )}
            <ContentBox
              content={post ? post.content : ""}
              likeQuantity={post ? post.likes - post?.dislikes : 0}
              name={post ? post.creator.name : ""}
              commentQuantity={post?.comments}
              postId={postId ? postId : ""}
              userLiked={post?.userLiked}
              likeOrDislikeFunction={handleLikePostButton}
            />

            <form
              onSubmit={createNewComment}
              className="flex flex-col items-center justify-center mt-8"
            >
              <div className="flex flex-col gap-3 w-[22.5rem]">
                <BigInput
                  placeHolder="Adicionar comentário"
                  name="post"
                  value={"post" in input ? input["post"] : ""}
                  onChange={changeInput}
                />
                <CommomButton fill={true} text="Responder" type="submit" />
                <div className="mt-3 mb-[1.63rem] h-px bg-gradient-to-r from-[#FF6489] to-[#F9B24E]" />
              </div>
            </form>

            <div className="gap-3 flex flex-col-reverse w-[22.5rem] mb-5">
              {comments.map((p: Comment) => (
                <ContentBox
                  content={p.content}
                  name={p.creatorName}
                  likeQuantity={p.like - p.dislike}
                  postId={postId ? postId : ""}
                  commentId={p.id}
                  likeOrDislikeFunction={handleLikeOrDislike}
                  key={p.id}
                  userLiked={p.userLiked}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
