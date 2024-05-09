import React from 'react';
import { useNavigate } from 'react-router-dom';

import useAuthStore from '@/store/auth.store';

/** 관리자 계정이 아닐 경우 404 오류페이지로 리다이렉션 */
export function withAdminAuthenticatedUser(
  WrappedComponent: React.ComponentType,
) {
  function Component() {
    const { isAdminUser } = useAuthStore();
    const navigate = useNavigate();

    if (!isAdminUser) {
      // 404 페이지로 이동
      return null;
    }

    return <WrappedComponent />;
  }
  return Component;
}
