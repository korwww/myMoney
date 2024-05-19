export interface IReviewImage {
  reviewImg: string;
}

export interface IReviewList {
  id: number;
  categoryId: number;
  userId: number;
  userName: string;
  title: string;
  content: string;
  stars: number;
  createdAt: string;
  verified: number;
  reviewImg: IReviewImage[];
  likes: number;
}

export interface IReviewPagination {
  currentPage: number;
  totalCount: number;
}

export interface ISearchReview {
  reviews: IReviewList[];
  pagination: IReviewPagination;
}
