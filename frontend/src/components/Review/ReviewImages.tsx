import React from 'react';
import styled from 'styled-components';

interface ReviewImagesProps {
  children: React.ReactNode;
}

function ReviewImages({ children }: ReviewImagesProps) {
  return (
    <ReviewImagesStyle>
      <div className="imageWrap">{children}</div>
    </ReviewImagesStyle>
  );
}

const ReviewImagesStyle = styled.div`
  width: 100%;
  height: 390px;
  background-color: #ffa;
`;

export default ReviewImages;
