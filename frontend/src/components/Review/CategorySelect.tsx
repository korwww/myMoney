import styled from 'styled-components';
import Dropdown from '@/components/common/Dropdown';
import CaretDown from '@/assets/icons/CaretDown';

interface CategorySelectorProps {
  categoryOptions: string[];
  categoryIndex: number;
  setCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
}

function CategorySelector({
  categoryOptions,
  categoryIndex,
  setCategoryIndex,
}: CategorySelectorProps) {
  const handleSelectCategory = (index: number) => {
    setCategoryIndex(index);
  };

  return (
    <CategoryContainer>
      <p>{categoryOptions[categoryIndex]}</p>

      <Dropdown
        toggleButton={<CaretDown />}
        $positionLnR="right"
        $positionValue={-10}
        $positionTopValue={32}
        $width={150}
      >
        <ul>
          {categoryOptions.map((option, index) => (
            <li key={index} onClick={() => handleSelectCategory(index)}>
              {option}
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
