import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import JoinTemplate from '@/components/Join/JoinTemplate';
import AlertText from '@/components/common/AlertText';
import Layout from '@/layout/Layout';
import { IUserRegistration } from '@/models/user.model';
import { VALIDATE } from '@/constance/validate';

const JoinStep3Password = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    getValues,
    formState: { errors, isValid },
  } = useForm<Pick<IUserRegistration, 'password' | 'password_checked'>>({
    mode: 'onChange',
  });

  const password = watch('password');
  const passwordChecked = watch('password_checked');

  useEffect(() => {
    if (password !== passwordChecked && passwordChecked) {
      setError('password_checked', {
        type: 'password_mismatch',
        message: '비밀번호가 일치하지 않습니다.',
      });
    } else {
      clearErrors('password_checked');
    }
  }, [password, passwordChecked]);

  const passwordValidation = {
    required: '비밀번호는 필수 입력입니다',
    minLength: {
      value: 6,
      message: '최소 6글자 이상 입력해주세요',
    },
    maxLength: {
      value: 12,
      message: '최대 12글자까지만 사용가능합니다.',
    },
    pattern: {
      value: VALIDATE.PASSWORD_REGEX,
      message:
        '비밀번호 형식이 올바르지 않거나 동일한 문자/숫자를 연속으로 3개 이상 사용할 수 없습니다.',
    },
  };

  const passwordCheckedValidation = {
    validate: {
      matchPassword: (value: string) => {
        const { password } = getValues();
        return password === value || '비밀번호가 일치하지 않습니다.';
      },
    },
  };

  const onSubmit = handleSubmit((data) => {
    // 넘어온 데이터 중에 password만 추출
    // email,nickname은 navigate할 때 state로 전달받거나,
    // zustand를 사용하여 저장한 유저 정보 사용
    // const user = {email,nickname,password:data.password}
    // 회원가입 로직
    // 로그인페이지로 이동
  });

  return (
    <Layout title="회원가입" showBackButton>
      <JoinTemplate
        current={3}
        title="비밀번호를\n입력해주세요."
        onSubmit={onSubmit}
        isValid={isValid}
      >
        <fieldset>
          <input
            {...register('password', passwordValidation)}
            type="password"
            placeholder="비밀번호를 입력해주세요"
          />
          {errors.password && (
            <AlertText size="small">{errors.password.message}</AlertText>
          )}
        </fieldset>
        <fieldset>
          <input
            {...register('password_checked', passwordCheckedValidation)}
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
          />
          {errors.password_checked && (
            <AlertText size="small">
              {errors.password_checked.message}
            </AlertText>
          )}
        </fieldset>
        <PasswordDescription>
          영문 대소문자, 숫자, 특수문자(!@#$%)를 혼합하여 6~12자로 입력해주세요.
          동일한 문자/숫자는 3글자 이상 연속으로 사용할 수 없습니다.
        </PasswordDescription>
      </JoinTemplate>
    </Layout>
  );
};

const PasswordDescription = styled.p`
  color: ${({ theme }) => theme.color.border};
  font-size: ${({ theme }) => theme.text['small'].fontSize};
`;

export default JoinStep3Password;
