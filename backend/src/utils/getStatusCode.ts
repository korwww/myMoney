import { ERROR_MESSAGE } from '../constance/errorMessage';

export const getStatusCode = (errorMessage: string | undefined): number => {
  switch (errorMessage) {
    case ERROR_MESSAGE.NOT_MATCHED_PASSWORD:
      return 400;
    case ERROR_MESSAGE.INVALID_TOKEN:
    case ERROR_MESSAGE.INVALID_USER:
    case ERROR_MESSAGE.SESSION_EXPIRED:
      return 401;
    case ERROR_MESSAGE.DUPLICATE_EMAIL:
    case ERROR_MESSAGE.DUPLICATE_NICKNAME:
    case ERROR_MESSAGE.DUPLICATE_REPORT:
      return 409;
    case ERROR_MESSAGE.USER_NOT_FOUND:
      return 404;
    case ERROR_MESSAGE.DENIED:
    case ERROR_MESSAGE.USER_IS_SUSPENDED:
      return 403;
    default:
      return 500;
  }
};
