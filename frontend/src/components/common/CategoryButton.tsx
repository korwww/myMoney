import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from './Button';
import { ICategoryItem } from '@/models/category.model';
import React from 'react';

function CategoryButton({ categoryId, element, categoryName }: ICategoryItem) {
  return (
    <CategoryButtonStyle className="item" key={categoryId}>
      <StyledLink
        to={{
          pathname: '/list',
          search:
            categoryId != 10 ? `?categoryId=${categoryId}` : `?isVerified=true`,
        }}
      >
        <Button
          key={categoryId}
          children={
            React.isValidElement(element) ? (
              element
            ) : (
              <img src={element as string} alt={categoryName} />
            )
          }
          size={'small'}
          scheme={'disabled'}
        />
        <p>{categoryName}</p>
      </StyledLink>
    </CategoryButtonStyle>
  );
}

const CategoryButtonStyle = styled.div`
  grid-column: span 1;
  display: flex;
  justify-content: center;

  p {
    font-size: 12px;
    max-width: 55px;
    white-space: nowrap;
    overflow: visible;
    display: flex;
    justify-content: center;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 55px;
    height: 55px;
    margin-bottom: 4px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

export default CategoryButton;
