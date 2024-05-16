import Layout from '@/layout/Layout';
import styled from 'styled-components';
import { MagnifyingGlass } from '@/api/assets/icons/MagnifyingGlass';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { IsearchQuery, postSearchResults } from '@/api/search.api';

function Search() {
  const [searchValue, setSearchValue] = useState('');
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <MagnifyingGlass />
          <input
            type="text"
            {...register('query', { required: true })}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  margin-top: 90px;
`;

export default Search;
