import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuthStore from '@/store/auth.store';

/** 로그인 하지 않아도 되는 페이지를 로그인한 유저가 접근했을 때 메인 페이지로 리다이렉션 */
export function withUnauthenticatedUser(WrappedComponent: React.ComponentType) {
  function Component() {
    const { isLoggedIn } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
      if (isLoggedIn) {
        navigate('/');
      }
    }, [isLoggedIn, navigate]);

    if (isLoggedIn) return null;

    return <WrappedComponent />;
  }
  return Component;
}
