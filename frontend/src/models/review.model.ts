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
  imgSrc: string;
  content: string;
  verified: boolean;
  likes: number;
  userId: number;
  id: number;
  isOwner: boolean; // 작성자 여부 (임시로 설정, api에 맞춰서 수정해야 함)
  isLiked: boolean; // 좋아요 여부 (임시로 설정, api에 맞춰서 수정해야 함)
}
