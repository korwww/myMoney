import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { AiFillStar } from 'react-icons/ai';

interface RatingSectionProps {
  ratingIndex: number;
  setRatingIndex: Dispatch<SetStateAction<number>>;
}

function StatRating({ ratingIndex, setRatingIndex }: RatingSectionProps) {
  const ArrayIndexes = [1, 2, 3, 4, 5];

  return (
    <RatingContainer>
      {ArrayIndexes.map((arrayindex, index) => (
        <RatingStar
          size={35}
          key={index}
          className={arrayindex <= ratingIndex ? 'active' : 'inactive'}
          onClick={() => setRatingIndex(arrayindex)}
        />
      ))}
    </RatingContainer>
  );
}

export default StatRating;

const RatingContainer = styled.div`
  display: flex;
  text-align: center;
  margin: 12px 0px;
  justify-content: center;
  background-color: blue;

  .inactive {
    color: ${({ theme }) => theme.color.disabled};
  }
  .active {
    color: #ffe600;
  }
`;

const RatingStar = styled(AiFillStar)`
  cursor: pointer;
`;
