export interface IReview {
  title: string;
  content: string;
  stars: number;
  categoryId: number;
  reviewImg: string[];
  receiptImg: string;
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
