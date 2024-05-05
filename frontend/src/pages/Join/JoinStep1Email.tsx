import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import Layout from '@/layout/Layout';
import JoinTemplate from '@/components/Join/JoinTemplate';
import AuthOptions from '@/components/common/AuthOptions';
import AlertText from '@/components/common/AlertText';
import { IUserRegistration } from '@/models/user.model';
import { useNavigate } from 'react-router-dom';

function JoinStep1Email() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Pick<IUserRegistration, 'email'>>();

  const onSubmit = handleSubmit(() => {
    // 다음 단계로 이동, zustand에 유저 정보 저장
    // navigate('/join/step2');
  });
  return (
    <Layout>
      <JoinTemplate
        current={1}
        title="이메일을\n입력해주세요."
        onSubmit={onSubmit}
        isValid={isValid}
      >
        <fieldset>
          <input
            {...register('email', { required: '이메일을 입력해주세요' })}
            type="email"
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

export default JoinStep1Email;
