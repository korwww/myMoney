import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuthStore from '@/store/auth.store';

/** 관리자 계정이 아닐 경우 404 오류페이지로 리다이렉션 */
export function withAdminAuthenticatedUser(
  WrappedComponent: React.ComponentType,
) {
  function Component() {
    const { isAdminUser } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAdminUser) {
        // 404 오류 발생시키고 싶음...
        navigate('/');
      }
    }, [navigate, isAdminUser]);

    if (!isAdminUser) return null;

    return <WrappedComponent />;
  }
  return Component;
}
