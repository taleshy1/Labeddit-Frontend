import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  action: (postId: string, value?: boolean, commentId?: string) => void;
  postId: string;
  value?: boolean;
  commentId?: string;
}

export function ButtonWithIcon({
  children,
  action,
  postId,
  value,
  commentId,
}: Props) {
  return (
    <button
      onClick={() => {
        action(postId, value, commentId);
      }}
    >
      {children}
    </button>
  );
}
