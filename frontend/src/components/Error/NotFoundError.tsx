import Button from '@/components/common/Button';
import { ButtonContainer } from './ErrorTemplate.style';
import ErrorTemplate from './ErrorTemplate';
import { handleGoBack, handleGoHome } from '@/utils/routingUtils';

export default function NotFoundError() {
  return (
    <ErrorTemplate
      $errorStatus={404}
      title="원하는 페이지를 찾을 수 없습니다."
      content="잘못된 주소가 입력되었거나,\n요청하신 페이지의 주소가 변경 또는 삭제 되어\n찾을 수 없습니다."
    >
      <ButtonContainer length={2}>
        <Button
          $fullWidth
          size="medium"
          scheme="disabled"
          onClick={handleGoBack}
        >
          이전
        </Button>

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
