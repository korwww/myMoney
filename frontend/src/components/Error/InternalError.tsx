import Button from '@/components/common/Button';
import ErrorTemplate from './ErrorTemplate';
import { ButtonContainer } from './ErrorTemplate.style';

export default function InternalError() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <ErrorTemplate
      title="시스템 오류가 발생하였습니다."
      content="시적인 오류로 서버와 연결이 끊겼습니다.\n잠시 후 다시 시도해주세요."
    >
      <ButtonContainer length={1}>
        <Button $fullWidth size="medium" scheme="primary" onClick={handleRetry}>
          다시 시도하기
        </Button>
      </ButtonContainer>
    </ErrorTemplate>
  );
}
