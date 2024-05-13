import Button from '@/components/common/Button';
import AlertText from '../common/AlertText';
import ErrorTemplate from './ErrorTemplate';
import { ButtonContainer } from './ErrorTemplate.style';
import { handleGoHome } from '@/utils/routingUtils';
import { AxiosError } from 'axios';

interface ForbiddenErrorProps {
  error: AxiosError<any, any>;
}

export default function ForbiddenError({ error }: ForbiddenErrorProps) {
  const { response } = error;

  const { reportCount, suspensionRemainingDays } = response?.data;
  const isBanned = reportCount >= 5 ? '영구' : '일시';

  return (
    <ErrorTemplate
      title={`${isBanned} 정지된 계정입니다.`}
      content={`이 계정은 내돈내산의 운영원칙을 위반했으므로 ${isBanned} 정지되었습니다.`}
    >
      {isBanned === '일시' && (
        <AlertText size="medium">
          정지 종료까지 {suspensionRemainingDays}일 남음
        </AlertText>
      )}
      <ButtonContainer length={1}>
        <Button
          $fullWidth
          size="medium"
          scheme="primary"
          onClick={handleGoHome}
        >
          홈
        </Button>
      </ButtonContainer>
    </ErrorTemplate>
  );
}
