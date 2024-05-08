import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import {
  checkedEmail,
  checkedNickname,
  join,
  login,
  logout,
} from '@/api/auth.api';
import useUserRegistrationStore from '@/store/user.registration.store';
import { IUserLogin } from '@/models/user.model';

// 아이디 저장 만료일 (한달)
const EXPIRATION_MAX_AGE = 30 * 24 * 60 * 60;

export const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['email']);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const navigate = useNavigate();
  const { email, nickname, setEmail, setNickname } = useUserRegistrationStore();

  const userCheckedEmail = (email: string) => {
    checkedEmail({ email })
      .then((res) => {
        setEmail(email);
        navigate('/join/step2');
      })
      .catch((error) => {
        console.error(error);
        if (error.response.data.message === 'Duplicate email')
          return setErrorMessage('이미 사용중인 이메일입니다.');
        return setErrorMessage(
          '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
        );
      });
  };

  const userCheckedNickname = (nickname: string) => {
    checkedNickname({ nickname })
      .then((res) => {
        setNickname(nickname);
        navigate('/join/step3');
      })
      .catch((error) => {
        console.error(error);
        if (error.response.data.message === 'Duplicate nickname')
          return setErrorMessage('이미 사용중인 닉네임입니다.');
        return setErrorMessage(
          '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
        );
      });
  };

  const userJoin = (password: string) => {
    if (!email) return navigate('/join/step1');
    if (!nickname) return navigate('/join/step2');

    join({ email, nickname, password })
      .then((res) => {
        setEmail(null);
        setNickname(null);

        alert('회원가입에 성공했습니다.');
        navigate('/login');
      })
      .catch((error) => {
        console.error(error);

        alert('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.');
        navigate('/join/step1');
      });
  };

  const userLogin = (data: IUserLogin, rememberEmail: boolean) => {
    login(data)
      .then((res) => {
        if (rememberEmail) {
          setCookie('email', data.email, {
            path: '/login',
            maxAge: EXPIRATION_MAX_AGE,
          });
        } else {
          removeCookie('email');
        }
        setErrorMessage(null);
        navigate('/');
      })
      .catch((error) => {
        if (error.response.data.message === 'Not Matched Password')
          return setErrorMessage('비밀번호가 틀렸습니다.');
      });
  };

  const userLogout = () => {
    logout()
      .then((res) => navigate('/'))
      .catch((error) => console.error(error));
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
