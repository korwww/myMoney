// src/hooks/useAuth.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useMutation } from '@tanstack/react-query';
import {
  checkedEmail,
  checkedNickname,
  join,
  login,
  logout,
} from '@/api/auth.api';
import useUserRegistrationStore from '@/store/user.registration.store';
import useAuthStore from '@/store/auth.store';
import { IUserLogin } from '@/models/user.model';
import { handleGoHome } from '@/utils/routingUtils';

// 아이디 저장 만료일 (한달)
const EXPIRATION_MAX_AGE = 30 * 24 * 60 * 60;

export const useAuth = () => {
  const [_, setCookie, removeCookie] = useCookies(['email']);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { storeLogin, storeLogout, setIsAdminUser } = useAuthStore();
  const { email, nickname, setEmail, setNickname } = useUserRegistrationStore();

  /** 이메일 중복 검사 */
  const checkedEmailMutation = useMutation({
    mutationFn: checkedEmail,
    onSuccess: () => {
      setEmail(email);
      setErrorMessage(null);
      navigate('/join/step2');
    },
    throwOnError: (error) => {
      console.error(error);
      if (error.response.data.message === 'Duplicate email') return false;
      return true;
    },
    onError: (error: any) => {
      console.error(error);
      if (error.response.data.message === 'Duplicate email') {
        setErrorMessage('이미 사용중인 이메일입니다.');
      }
    },
  });

  const userCheckedEmail = (email: string) => {
    checkedEmailMutation.mutate({ email });
  };

  /** 닉네임 중복 검사 */
  const checkedNicknameMutation = useMutation({
    mutationFn: checkedNickname,
    onSuccess: () => {
      setErrorMessage(null);
      setNickname(nickname);
      navigate('/join/step3');
    },
    throwOnError: (error) => {
      if (error.response.data.message === 'Duplicate nickname') return false;
      return true;
    },
    onError: (error: any) => {
      if (error.response.data.message === 'Duplicate nickname') {
        setErrorMessage('이미 사용중인 닉네임입니다.');
      }
    },
  });

  const userCheckedNickname = (nickname: string) => {
    checkedNicknameMutation.mutate({ nickname });
  };

  /** 회원 가입 */
  const joinUserMutation = useMutation({
    mutationFn: join,
    onSuccess: () => {
      setEmail(null);
      setNickname(null);
      setErrorMessage(null);
      alert('회원가입에 성공했습니다.');
      navigate('/login');
    },
    throwOnError: true,
  });

  const userJoin = (password: string) => {
    if (!email) {
      alert('이메일을 입력하지 않으셨습니다.');
      navigate('/join/step1');
      return;
    }
    if (!nickname) {
      alert('닉네임을 입력하지 않으셨습니다.');
      navigate('/join/step2');
      return;
    }

    joinUserMutation.mutate({ email, nickname, password });
  };

  /** 로그인 */
  const loginUserMutation = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      setErrorMessage(null);
      storeLogin();

      const { isAdmin } = res.data;

      if (isAdmin) {
        setIsAdminUser(true);
        navigate('/admin/report-user');
      } else {
        navigate('/');
      }
    },
    throwOnError: (error) => {
      if (error.response.status === 400) return false;
      return true;
    },
    onError: (error: any) => {
      if (error.response.data.message === 'Not Matched Password')
        setErrorMessage('비밀번호가 틀렸습니다.');
      throw error;
    },
  });

  const userLogin = (data: IUserLogin, rememberEmail: boolean) => {
    if (rememberEmail) {
      setCookie('email', data.email, {
        path: '/login',
        maxAge: EXPIRATION_MAX_AGE,
      });
    } else {
      removeCookie('email');
    }
    loginUserMutation.mutate(data);
  };

  /** 로그아웃 */
  const logoutUserMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsAdminUser(false);
      storeLogout();
      handleGoHome();
    },
    throwOnError: true,
  });

  const userLogout = () => {
    logoutUserMutation.mutate();
  };

  return {
    errorMessage,
    userJoin,
    userCheckedEmail,
    userCheckedNickname,
    userLogout,
    userLogin,
  };
};
