export interface IReview {
  id: number;
  title: string;
  content: string;
  stars: number;
  categoryId: number;
  categoryName: string;
  reviewImg: string[];
  receiptImg: string;
}
export interface IReviewDetail extends IReview {
  userId: number;
  name: string;
  likes: number;
  isLiked: boolean;
  isAuthor: boolean;
  createdAt: string;
  verified: number;
  comments: [];
}

export interface IReviewItem {
  title: string;
  createdAt: string;
  userName: string;
  reviewImg: string;
  content: string;
  verified: boolean;
  likes: number;
  userId: number;
  id: number;
  isMyReview: boolean;
  isLiked: boolean;
}
