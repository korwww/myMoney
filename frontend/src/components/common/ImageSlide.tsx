import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
  items: React.ReactNode[];
}

function ImageSlide({ items }: Props) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <ImageSlideStyle>
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={`item-${index}`}>{item}</div>
        ))}
      </Slider>
    </ImageSlideStyle>
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
