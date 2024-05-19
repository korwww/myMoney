import styled from 'styled-components';
import { useCategory } from '@/hooks/useCategory';

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
import Loading from './Loading';
import { LoadingContainer } from '../Admin/AdminContent';

const assetMap = {
  디지털: <Devices />,
  의류: <TShirt />,
  '가구/인테리어': <Armchair />,
  가전: <Oven />,
  문화: <FilmSlate />,
  식품: <Hamburger />,
  '뷰티/미용': <HairDryer />,
  장소: <MapPin />,
  기타: <DotsThree />,
  인증: CheckImg,
};

function Category() {
  const { categoryList, isLoading } = useCategory();
  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }

  const categories: ICategoryItem[] = categoryList.map(
    (category: { id: number; name: string }) => ({
      categoryId: category.id,
      categoryName: category.name,
      element: assetMap[category.name as keyof typeof assetMap],
    }),
  );

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
