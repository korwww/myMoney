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
import img from '@/assets/images/badge-img.png';

const categorys = [
  <Devices />,
  <TShirt />,
  <Armchair />,
  <Oven />,
  <FilmSlate />,
  <Hamburger />,
  <HairDryer />,
  <MapPin />,
  <DotsThree />,
  <img src={img} />,
];

function CateogoryButton() {
  return (
    <CateogoryButtonStyle>
      <div className="items">
        {categorys.map((category, idx) => (
          <div className="item">
            <Button
              key={idx}
              children={category}
              size={'small'}
              scheme={'disabled'}
            />
            <p>카테고리</p>
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

  p {
    font-size: 12px;
    text-align: center;
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

export default CateogoryButton;
