// import { RequestHandler } from 'express';

// export interface IReviewImage {
//   reviewImg: string;
// }

// export interface IReviewList {
//   id: number;
//   categoryId: number;
//   userId: number;
//   userName: string;
//   title: string;
//   content: string;
//   stars: number;
//   createdAt: string;
//   verified: number;
//   reviewImg: IReviewImage[];
//   likes: number;
// }

// export interface IReviewPagination {
//   currentPage: number;
//   totalCount: number;
// }

// export interface ISearchReview {
//   reviews: IReviewList[];
//   pagination: IReviewPagination;
// }

// //request, response를 담당
// export const postSearchReviews: RequestHandler<ISearchReview> = (req, res) => {
//   const { currentPage } = req.query;
//   try {
//     // 예를 들어, 여기서는 간단히 검색 결과를 모두 가져오는 것으로 가정하겠습니다.
//     const reviews: IReviewList[] = []; // 여기에 검색 결과를 가져오는 로직을 구현합니다.
//     const totalCount: number = reviews.length; // 총 검색 결과 수

//     // 페이징 처리를 위한 로직
//     const itemsPerPage: number = 10; // 페이지 당 아이템 수
//     const currentPageNumber: number = currentPage
//       ? parseInt(currentPage as string)
//       : 1;
//     const startIndex: number = (currentPageNumber - 1) * itemsPerPage;
//     const endIndex: number = Math.min(
//       startIndex + itemsPerPage,
//       reviews.length,
//     );

//     const paginatedReviews: IReviewList[] = reviews.slice(startIndex, endIndex);
//     const pagination: IReviewPagination = {
//       currentPage: currentPageNumber,
//       totalCount: totalCount,
//     };

//     return res.status(200).json({ reviews: paginatedReviews, pagination });
//   } catch (err) {
//     // 공통 에러 핸들러 필요
//     console.log(err);
//     return res.status(500).json({ message: '오류' });
//   }
// };
