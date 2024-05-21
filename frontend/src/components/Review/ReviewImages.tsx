import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ReviewImage from './ReviewImage';
import { NextArrow, PrevArrow } from './ReviewImageSliderArrow';

export interface ReviewImagesProps {
  reviewImages: string[];
  title: string;
}

function ReviewImages({ reviewImages, title }: ReviewImagesProps) {
  const settings = {
    dots: true,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  if (!reviewImages.length) return null;
  return (
    <ReviewImagesStyle>
      {/* 이미지가 하나면 이미지만 출력 */}
      {reviewImages.length === 1 && (
        <ReviewImage title={title} imgSrc={reviewImages[0]} />
      )}

      {/* 이미지가 두 개 이상이면 슬라이드 형태로 출력 */}
      {reviewImages.length > 1 && (
        <ReactSlider {...settings}>
          {reviewImages.map((imgSrc, idx) => (
            <ReviewImage key={idx} imgSrc={imgSrc} title={title} />
          ))}
        </ReactSlider>
      )}
    </ReviewImagesStyle>
  );
}

const ReviewImagesStyle = styled.div`
  width: 100%;
  height: 390px;
  background-color: ${({ theme }) => theme.color.background};
  position: relative;
  overflow: hidden;
`;

const ReactSlider = styled(Slider)`
  /* 슬라이드 기존 화살표 숨김 */
  .slick-prev:before,
  .slick-next:before {
    display: none;
  }

  /* 슬라이드 화살표 위치,크기 변경 */
  .slick-next,
  .slick-prev {
    width: 32px;
    height: 32px;
    z-index: 2;
  }
  .slick-prev {
    left: 10px;
  }
  .slick-next {
    right: 10px;
  }
  /* 슬라이드 도트 위치 변경 */
  .slick-dots {
    bottom: 5px;
    li {
      margin: 0;
    }
  }
`;
export default ReviewImages;
