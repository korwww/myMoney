import { Attention } from '@/assets/icons/Attention';
import Button from '@/components/common/Button';
import styled from 'styled-components';
import { NotFoundStyled } from './404.Page';

export default function InternalError() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <NotFoundStyled>
      <Attention />
      <p className="title">시스템 오류가 발생하였습니다.</p>
      <p className="content">
        일시적인 오류로 서버와 연결이 끊겼습니다.
        <br />
        잠시 후 다시 시도해주세요.
      </p>
      <ButtonContainer>
        <Button
          size="medium"
          scheme="primary"
          $fullWidth={true}
          onClick={handleRetry}
        >
          다시 시도하기
        </Button>
      </ButtonContainer>
    </NotFoundStyled>
  );
}

const ButtonContainer = styled.div`
  margin-top: 20px;
  width: 300px;
`;
