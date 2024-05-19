export interface IComment {
  id: number;
  userId: number;
  name: string;
  content: string;
  createdAt: string;
  isAuthor: boolean;
}

export type TCommentItemWrite = {
  content: IComment['content'];
  reviewId: string;
};
