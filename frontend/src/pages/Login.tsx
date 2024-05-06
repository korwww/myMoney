import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import LoginForm from '@/components/Login/LoginForm';
import AuthOptions from '@/components/common/AuthOptions';
import { IUserLogin } from '@/models/user.model';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserLogin>();

  const onSubmit = handleSubmit(() => {});
  return (
    <Container>
      <Title>로그인</Title>
      <LoginForm register={register} onSubmit={onSubmit} errors={errors} />
      <AuthOptions
        description="아직 계정이 없으신가요?"
        linkPath="/join/step1"
        linkText="회원가입"
      />
    </Container>
  );
}

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.mainContent};
`;

const Title = styled.div`
  padding-top: 140px;
  margin-bottom: 120px;
  text-align: center;
  color: ${({ theme }) => theme.color.primary};
  font-size: 42px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export default Login;
