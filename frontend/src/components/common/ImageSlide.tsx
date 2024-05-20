import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Props {
  items: React.ReactNode[];
}

interface ArrowProps {
  className?: any;
  style?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

function ImageSlide({ items }: Props) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomArrow />,
    prevArrow: <CustomArrow />,
  };
  return (
    <ImageSlideStyle>
      <Slider {...settings}>{items.map((item) => item)}</Slider>
    </ImageSlideStyle>
  );
}

function CustomArrow({ className, style, onClick }: ArrowProps) {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2,
      }}
      onClick={onClick}
    >
      {className?.includes('slick-prev') ? (
        <FaChevronLeft
          style={{
            color: 'black',
            fontSize: '2.5rem',
            position: 'absolute',
            left: '25px',
          }}
        />
      ) : (
        <FaChevronRight
          style={{
            color: 'black',
            fontSize: '2.5rem',
            position: 'absolute',
            right: '25px',
          }}
        />
      )}
    </div>
  );
}

const ImageSlideStyle = styled.div`
  max-width: 390px;
  width: 390px;
  margin: auto;
  height: 350px;
  overflow: hidden;
`;

export default ImageSlide;
