import React from 'react';
import { useNavigate } from 'react-router-dom';

import useAuthStore from '@/store/auth.store';

/** 로그인이 필요한 페이지를 로그인하지 않은 유저가 접근했을 때 로그인 페이지로로 리다이렉션 */
export function withAuthenticatedUser(WrappedComponent: React.ComponentType) {
  function Component() {
    const { isLoggedIn } = useAuthStore();
    const navigate = useNavigate();

    // 로그인하지 않은 유저라면 로그인페이지로 이동
    if (!isLoggedIn) {
      navigate('/login');
      return null;
    }

    return <WrappedComponent />;
  }
  return Component;
}
