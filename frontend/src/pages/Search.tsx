import Layout from '@/layout/Layout';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { IsearchQuery, postSearchResults } from '@/api/search.api';
import Input from '@/components/common/Input';
import { MagnifyingGlass } from '@/assets/icons/MagnifyingGlass';

function Search() {
  const { register, handleSubmit } = useForm<IsearchQuery>();
  const onSubmit = (data: IsearchQuery) => {
    SearchMutation.mutate(data);
  };

  const SearchMutation = useMutation({
    mutationFn: postSearchResults,
    onSuccess(res) {
      console.log('검색 성공!');
    },
    onError(err) {
      console.log('검색 실패!');
    },
  });

  return (
    <Layout showBackButton={true} title="검색">
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset>
            <SearchIcon onClick={() => alert('아이콘 클릭!')}>
              <MagnifyingGlass />
            </SearchIcon>
            <StyledInput
              $inputType="text"
              {...register('query', { required: true })}
              type="text"
              placeholder="검색어를 입력해주세요"
            />
          </Fieldset>
        </Form>
      </Container>
    </Layout>
  );
}

const Container = styled.div``;

const Form = styled.form``;

const Fieldset = styled.fieldset`
  position: relative;
  width: 100%;
`;

const StyledInput = styled(Input)`
  padding-left: 50px; /* 아이콘을 수용할 수 있는 충분한 공간 확보 */
  height: 40px;
  box-sizing: border-box;
  width: 100%;
`;

const SearchIcon = styled.div`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 10px; /* 인풋 필드 내부 왼쪽으로 정확한 위치 조정 */
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px; /* 인풋 필드 높이와 일치 */
`;

export default Search;
