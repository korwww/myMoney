import { useForm } from 'react-hook-form';
import cookie from 'react-cookies';
import styled from 'styled-components';

import LoginForm from '@/components/Login/LoginForm';
import AuthOptions from '@/components/common/AuthOptions';
import { IUserLogin } from '@/models/user.model';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/common/Icon';
import { TextLogo } from '@/assets/icons/textLogo';

// 아이디 저장 만료일 (한달)
const EXPIRATION_MAX_AGE = 30 * 24 * 60 * 60;

function Login() {
  const [checkedRememberEmail, setCheckedRememberEmail] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IUserLogin>();

  const toggleCheckedRememberEmail = () => {
    setCheckedRememberEmail(!checkedRememberEmail);
  };

  const onSubmit = handleSubmit((data: IUserLogin) => {
    // 아이디저장 값에 따라 쿠키에 값을 세팅하거나 제거
    if (checkedRememberEmail) {
      cookie.save('rememberEmail', data.email, {
        path: '/login',
        maxAge: EXPIRATION_MAX_AGE,
      });
    } else {
      cookie.remove('rememberEmail');
    }
  });

  useEffect(() => {
    // cookie에 이메일이 저장되어있으면 값 설정
    const savedEmail = cookie.load('rememberEmail');

    if (savedEmail) {
      setValue('email', savedEmail);
    }
  }, []);
  return (
    <Container>
      <Title to="/">
        <Icon width={160} height={38} icon={<TextLogo />} fill="#59B05F" />
      </Title>
      <LoginForm
        checkedRememberEmail={checkedRememberEmail}
        toggleCheckedRememberEmail={toggleCheckedRememberEmail}
        register={register}
        onSubmit={onSubmit}
        errors={errors}
      />
      <AuthOptions
        description="아직 계정이 없으신가요?"
        linkPath="/join/step1"
        linkText="회원가입"
      />
    </Container>
  );
}

const Container = styled.div`
  max-width: 390px;
  margin-inline: auto;
  padding: ${({ theme }) => theme.padding.mainContent};
`;

const Title = styled(Link)`
  display: flex;
  justify-content: center;
  padding-top: 140px;
  margin-bottom: 100px;
  margin-inline: auto;
  color: ${({ theme }) => theme.color.primary};
  font-size: 42px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export default Login;
