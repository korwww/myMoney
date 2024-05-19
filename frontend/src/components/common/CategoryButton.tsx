import styled from 'styled-components';
import Button from './Button';

import { Armchair } from '@/assets/icons/Armchair';
import { HairDryer } from '@/assets/icons/HairDryer';
import { Hamburger } from '@/assets/icons/Hamburger';
import { MapPin } from '@/assets/icons/MapPin';
import { TShirt } from '@/assets/icons/TShirt';
import { Devices } from '@/assets/icons/Devices';
import { Oven } from '@/assets/icons/Oven';
import { FilmSlate } from '@/assets/icons/FilmSlate';
import { DotsThree } from '@/assets/icons/DotsThree';
import { SealCheck } from '@/assets/icons/SealCheck';
import { Link } from 'react-router-dom';

const categorys = [
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
    categoryId: 10,
    categoryName: '인증',
    element: <SealCheck />,
  },
];

function CateogoryButton() {
  return (
    <CateogoryButtonStyle>
      <div className="items">
        {categorys.map((category) => (
          <div className="item">
            <StyledLink to={`/reviews?categoryId=${category.categoryId}`}>
              <Button
                key={category.categoryId}
                children={category.element}
                size={'small'}
                scheme={'disabled'}
              />
              <p>{category.categoryName}</p>
            </StyledLink>
          </div>
        ))}
      </div>
    </CateogoryButtonStyle>
  );
}

const CateogoryButtonStyle = styled.div`
  max-width: 100%;
  max-height: 200px;
  overflow: hidden;
  margin: 20px 0;

  p {
    font-size: 12px;
    max-width: 61px;
    white-space: nowrap;
    overflow: visible;
    display: flex;
    justify-content: center;
  }

  button {
    width: 55px;
    height: 55px;
  }

  .items {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 21px;
  }

  .item {
    grid-column: span 1;
    text-align: center;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

export default CateogoryButton;
