import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';

import LoginForm from '@/components/Login/LoginForm';
import AuthOptions from '@/components/common/AuthOptions';
import { IUserLogin } from '@/models/user.model';
import Icon from '@/components/common/Icon';
import { TextLogo } from '@/assets/icons/textLogo';
import { useAuth } from '@/hooks/useAuth';
import { withUnauthenticatedUser } from '@/components/hocs/withUnauthenticatedUser';

function Login() {
  const [cookies] = useCookies(['email']);
  const { errorMessage, userLogin } = useAuth();
  const [checkedRememberEmail, setCheckedRememberEmail] = useState(false);
  const { register, handleSubmit, setValue } = useForm<IUserLogin>();

  const toggleCheckedRememberEmail = () => {
    setCheckedRememberEmail(!checkedRememberEmail);
  };

  const onSubmit = handleSubmit((data: IUserLogin) => {
    userLogin(data, checkedRememberEmail);
  });

  useEffect(() => {
    if (cookies.email) {
      setValue('email', cookies.email);
      setCheckedRememberEmail(true);
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
        errorMessage={errorMessage}
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

export default withUnauthenticatedUser(Login);
