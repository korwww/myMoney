import React from 'react';
import styled from 'styled-components';
import Dropdown from '@/components/common/Dropdown';
import CaretDown from '@/assets/icons/CaretDown';

interface CategoryOption {
  id: number;
  name: string;
}

interface CategorySelectorProps {
  categoryOptions: CategoryOption[];
  selectedCategoryId: number;
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<number>>;
}

function CategorySelector({
  categoryOptions = [],
  selectedCategoryId,
  setSelectedCategoryId,
}: CategorySelectorProps) {
  
  const handleSelectCategory = (id: number) => {
    setSelectedCategoryId(id);
  };

  return (
    <CategoryContainer>
      <p>
        {categoryOptions.find((category) => category.id === selectedCategoryId)?.name || 'Select Category'}
      </p>

      <Dropdown
        toggleButton={<CaretDown />}
        $positionLnR="right"
        $positionValue={-10}
        $positionTopValue={32}
        $width={150}
      >
        <ul>
          {categoryOptions.slice(0, -1).map((option) => (
            <li key={option.id} onClick={() => handleSelectCategory(option.id)}>
              {option.name}
            </li>
          ))}
        </ul>
      </Dropdown>
    </CategoryContainer>
  );
}

export default CategorySelector;

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 40px;
  padding: 0px 8px;
  margin-bottom: 20px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};

  p {
    width: 120px;
    font-size: ${({ theme }) => theme.text.medium.fontSize};
  }

  .toggle {
    display: flex;
  }
`;
