import styled from 'styled-components';

interface ReviewImageProps {
  imgSrc: string;
  title: string;
}

function ReviewImage({ imgSrc, title }: ReviewImageProps) {
  return (
    <ReviewImageStyle>
      <img src={imgSrc} alt={title + '이미지'} />
    </ReviewImageStyle>
  );
}

export const ReviewImageStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 390px;
  img {
    max-width: 100%;
    max-height: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default ReviewImage;
