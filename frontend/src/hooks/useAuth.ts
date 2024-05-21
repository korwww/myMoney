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

// 아이디 저장 만료일 (한달)
const EXPIRATION_MAX_AGE = 30 * 24 * 60 * 60;

export const useAuth = () => {
  const [_, setCookie, removeCookie] = useCookies(['email']);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { storeLogin, storeLogout, setIsAdminUser } = useAuthStore();
  const { storeEmail, storeNickname, setStoreEmail, setStoreNickname } =
    useUserRegistrationStore();

  /** 이메일 중복 검사
   * - 성공하면 스토어에 이메일을 저장하고, 다음단계로 이동
   * - 중복 이메일일 경우, 오류메세지 출력
   * - 이외의 오류일 경우, ErrorBoundary 사용해서 오류 처리
   */
  const checkedEmailMutation = useMutation({
    mutationFn: checkedEmail,
    onSuccess: () => {
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
    setStoreEmail(email);
    checkedEmailMutation.mutate({ email });
  };

  /** 닉네임 중복 검사
   * - 성공하면 스토어에 닉네임을 저장하고, 다음 단계로 이동
   * - 중복 닉네임일 경우, 오류 메세지 출력
   * - 이외의 오류일 경우, ErrorBoundary 사용해서 오류 처리
   */
  const checkedNicknameMutation = useMutation({
    mutationFn: checkedNickname,
    onSuccess: () => {
      setErrorMessage(null);
      navigate('/join/step3');
    },
    throwOnError: (error) => {
      if (error.response.data.message === 'Duplicate nickname') return false;
      return true;
    },
    onError: (error: any) => {
      const { message } = error.response.data;
      if (message === 'Duplicate nickname') {
        setErrorMessage('이미 사용중인 닉네임입니다.');
      }
    },
  });

  const userCheckedNickname = (nickname: string) => {
    setStoreNickname(nickname);
    checkedNicknameMutation.mutate({ nickname });
  };

  /** 회원 가입
   * - 성공하면 스토어의 이메일/닉네임/오류메세지 초기화, 로그인화면으로 이동
   * - 오류 발생시 ErrorBoundary에서 오류 처리
   */
  const joinUserMutation = useMutation({
    mutationFn: join,
    onSuccess: () => {
      setStoreEmail(null);
      setStoreNickname(null);
      setErrorMessage(null);
      alert('회원가입에 성공했습니다.');
      navigate('/login');
    },
    throwOnError: true,
  });

  const userJoin = (password: string) => {
    if (!storeEmail) {
      alert('이메일을 입력하지 않으셨습니다.');
      navigate('/join/step1');
      return;
    }
    if (!storeNickname) {
      alert('닉네임을 입력하지 않으셨습니다.');
      navigate('/join/step2');
      return;
    }

    joinUserMutation.mutate({
      email: storeEmail,
      nickname: storeNickname,
      password,
    });
  };

  /** 로그인
   * - 성공하면 스토어에 로그인 상태 저장,
   * - 서버에서 반환된 사용자 데이터에 따라 관리자 여부를 확인하고, 관리자인 경우 관리자 페이지로 이동
   * - 비밀번호가 일치하지 않는 경우, 에러 메세지 출력
   * - 이외의 오류일 경우, ErrorBoundary에서 오류 처리
   */
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
      console.log(error);
      if (
        error?.response?.status === 400 ||
        error?.response?.data.message === 'User not found'
      )
        return false;
      return true;
    },
    onError: (error: any) => {
      const { message } = error.response.data;
      if (message === 'Not Matched Password')
        setErrorMessage('비밀번호가 틀렸습니다.');
      if (message === 'User not found') {
        setErrorMessage('존재하지 않는 이메일입니다.');
      }
      throw error;
    },
  });

  /** 로그인 수행 함수
   * - 이메일을 기억하는 경우 쿠키에 이메일을 저장, 아니면 쿠키에서 이메일 삭제
   * - 로그인 뮤테이션 호출
   */
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

  /** 로그아웃
   * - 성공하면 스토어에 관리자 여부, 로그인 상태를 초기화 시키고, 메인페이지로 이동
   * - 오류가 발생하면 ErrorBoundary에서 처리
   */
  const logoutUserMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsAdminUser(false);
      storeLogout();
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
