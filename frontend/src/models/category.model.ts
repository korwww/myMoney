export type TCategoryNames =
  | '디지털'
  | '의류'
  | '가구/인테리어'
  | '가전'
  | '문화'
  | '식품'
  | '뷰티/미용'
  | '장소'
  | '기타'
  | '인증';

export interface ICategoryItem {
  categoryId: number | null;
  categoryName: TCategoryNames;
  element?: JSX.Element | string;
}
