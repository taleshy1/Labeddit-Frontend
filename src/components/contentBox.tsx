import down from "../assets/down.svg";
import downColored from "../assets/downColorized.svg";
import { ButtonWithIcon } from "./ButtonWithIcon";
import up from "../assets/up.svg";
import upColored from "../assets/upColored.svg";
import comments from "../assets/comments.svg";

interface Props {
  name: string;
  content: string;
  likeQuantity: number;
  commentQuantity?: number;
  postId: string;
  userLiked?: number;
  commentId?: string;
  goTocommentsFunction?: (
    postId: string,
    value?: boolean,
    commentId?: string
  ) => void;
  likeOrDislikeFunction?: (
    postId: string,
    value: boolean,
    commentId?: string
  ) => void;
}
export function ContentBox({
  name,
  content,
  likeQuantity,
  commentQuantity,
  postId,
  userLiked,
  goTocommentsFunction,
  likeOrDislikeFunction,
  commentId,
}: Props) {
  return (
    <div className=" h-fit px-2.5 py-2 bg-neutral-50 rounded-xl border border-neutral-200 flex-col justify-start items-start gap-3 inline-flex ">
      <p className="text-center text-neutral-500 text-xs font-normal">
        Enviado por: {name}
      </p>
      <p className="break-all">{content}</p>
      <div className="flex gap-[0.69rem] ">
        <div className="flex gap-[0.4rem] rounded-3xl border border-gray-200 items-center p-1">
          <ButtonWithIcon
            action={() => likeOrDislikeFunction?.(postId, true, commentId)}
            postId={postId}
            value={false}
            commentId={commentId}
          >
            {userLiked === 1 ? (
              <img src={upColored} alt="Like" />
            ) : (
              <img src={up} alt="Like" />
            )}
          </ButtonWithIcon>
          <p className="text-neutral-500 text-xs font-bold">{likeQuantity}</p>
          <ButtonWithIcon
            action={() => likeOrDislikeFunction?.(postId, false, commentId)}
            postId={postId}
            value={true}
            commentId={commentId}
          >
            {userLiked === 0 ? (
              <img src={downColored} alt="Like" className="fill-red-200	" />
            ) : (
              <img src={down} alt="Like" />
            )}
          </ButtonWithIcon>
        </div>
        {(commentQuantity === 0 || commentQuantity) && (
          <div className="flex rounded-3xl border border-gray-200 p-2 gap-3 items-center">
            <ButtonWithIcon
              action={(postId) => goTocommentsFunction?.(postId)}
              postId={postId}
            >
              <img src={comments} alt="Comments" />
            </ButtonWithIcon>

            <p className="text-neutral-500 text-xs font-bold">
              {commentQuantity}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
