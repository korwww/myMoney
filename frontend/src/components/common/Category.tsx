import styled from 'styled-components';

import { Armchair } from '@/assets/icons/Armchair';
import { HairDryer } from '@/assets/icons/HairDryer';
import { Hamburger } from '@/assets/icons/Hamburger';
import { MapPin } from '@/assets/icons/MapPin';
import { TShirt } from '@/assets/icons/TShirt';
import { Devices } from '@/assets/icons/Devices';
import { Oven } from '@/assets/icons/Oven';
import { FilmSlate } from '@/assets/icons/FilmSlate';
import { DotsThree } from '@/assets/icons/DotsThree';
import CategoryButton from './CategoryButton';
import CheckImg from '@/assets/images/logo32x32.png';
import { ICategoryItem } from '@/models/category.model';

const categories: ICategoryItem[] = [
  {
    categoryId: 1,
    categoryName: '디지털',
    element: <Devices />,
  },
  {
    categoryId: 2,
    categoryName: '의류',
    element: <TShirt />,
  },
  {
    categoryId: 3,
    categoryName: '가구/인테리어',
    element: <Armchair />,
  },
  {
    categoryId: 4,
    categoryName: '가전',
    element: <Oven />,
  },
  {
    categoryId: 5,
    categoryName: '문화',
    element: <FilmSlate />,
  },
  {
    categoryId: 6,
    categoryName: '식품',
    element: <Hamburger />,
  },
  {
    categoryId: 7,
    categoryName: '뷰티/미용',
    element: <HairDryer />,
  },
  {
    categoryId: 8,
    categoryName: '장소',
    element: <MapPin />,
  },
  {
    categoryId: 9,
    categoryName: '기타',
    element: <DotsThree />,
  },
  {
    categoryId: null,
    categoryName: '인증',
    imgSrc: CheckImg,
  },
];

function Category() {
  return (
    <CategoryStyle>
      <div className="items">
        {categories.map((category) => (
          <CategoryButton key={category.categoryId} {...category} />
        ))}
      </div>
    </CategoryStyle>
  );
}

const CategoryStyle = styled.div`
  max-width: 100%;
  max-height: 200px;
  overflow: hidden;
  margin: 20px 0;

  .items {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    row-gap: 15px;
    column-gap: 21px;
  }
`;

export default Category;
