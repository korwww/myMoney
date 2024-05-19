import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import Layout from '@/layout/Layout';
import JoinTemplate from '@/components/Join/JoinTemplate';
import AuthOptions from '@/components/common/AuthOptions';
import AlertText from '@/components/common/AlertText';
import { IUserRegistration } from '@/models/user.model';
import { VALIDATE } from '@/constance/validate';
import Input from '@/components/common/Input';
import useUserRegistrationStore from '@/store/user.registration.store';
import { useAuth } from '@/hooks/useAuth';
import { withUnauthenticatedUser } from '@/components/hocs/withUnauthenticatedUser';

function JoinStep1Email() {
  const { errorMessage, userCheckedEmail } = useAuth();
  const { storeEmail } = useUserRegistrationStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Pick<IUserRegistration, 'email'>>({
    mode: 'onChange',
    defaultValues: { email: storeEmail ?? '' },
  });

  const emailValidation = {
    required: '이메일을 입력해주세요',
    pattern: {
      value: VALIDATE.EMAIL_REGEX,
      message: '올바른 이메일 형식이 아닙니다.',
    },
  };

  const onSubmit = handleSubmit((data) => {
    userCheckedEmail(data.email.trim());
  });

  return (
    <Layout title="회원가입" showBackButton>
      <JoinTemplate
        current={1}
        title="이메일을\n입력해주세요."
        onSubmit={onSubmit}
        isValid={isValid}
        errorMessage={errorMessage}
      >
        <fieldset>
          <Input
            $inputType="text"
            {...register('email', emailValidation)}
            placeholder="이메일을 입력해주세요"
          />
          {errors.email && (
            <AlertText size="small">{errors.email.message}</AlertText>
          )}
        </fieldset>
      </JoinTemplate>

      <Inner>
        <AuthOptions
          description="이미 계정을 가지고 계신가요?"
          linkText="로그인"
          linkPath="/login"
        />
      </Inner>
    </Layout>
  );
}

const Inner = styled.div`
  padding: ${({ theme }) => theme.padding.mainContent};
`;

export default withUnauthenticatedUser(JoinStep1Email);
