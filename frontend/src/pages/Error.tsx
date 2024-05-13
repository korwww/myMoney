import { AxiosError } from 'axios';

import ForbiddenError from '@/components/Error/ForbiddenError';
import InternalError from '@/components/Error/InternalError';
import NotFoundError from '@/components/Error/NotFoundError';

interface ErrorProps {
  error: unknown;
}

function Error({ error }: ErrorProps) {
  console.error(error);
  if (error instanceof AxiosError && error.response?.status === 404)
    return <NotFoundError />;

  if (error instanceof AxiosError && error.response?.status === 403)
    return <ForbiddenError error={error} />;

  return <InternalError />;
}

export default Error;
