import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import LoginForm from '@/components/Login/LoginForm';
import { IUserLogin } from '@/models/user.model';
import AuthOptions from '@/components/common/AuthOptions';
import { useAuth } from '@/hooks/useAuth';

function AdminLogin() {
  const { errorMessage, userLogin } = useAuth();
  const { register, handleSubmit } = useForm<IUserLogin>();

  const onSubmit = handleSubmit((data) => {
    userLogin(data, false);
  });
  return (
    <Container>
      <Inner>
        <Title>관리자 로그인</Title>
        <LoginForm
          onSubmit={onSubmit}
          register={register}
          errorMessage={errorMessage}
        />
        <div
          onClick={() =>
            alert('준비 중인 서비스입니다. 서비스 관리자에게 문의하세요')
          }
        >
          <AuthOptions
            description="계정을 잊으셨나요?"
            linkPath=""
            linkText="계정찾기"
          />
        </div>
      </Inner>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  margin-bottom: 120px;
  text-align: center;
  color: ${({ theme }) => theme.color.primary};
  font-size: 42px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
export default AdminLogin;
