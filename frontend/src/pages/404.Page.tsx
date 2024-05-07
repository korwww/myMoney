import { Attention } from '@/assets/icons/Attention';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <NotFoundStyled>
      <Attention />
      <p className="error">404 ERROR</p>
      <p className="title">원하는 페이지를 찾을 수 없습니다.</p>
      <p className="content">
        잘못된 주소가 입력되었거나,
        <br /> 요청하신 페이지의 주소가 변경 또는 삭제 되어 <br />
        찾을 수 없습니다.
      </p>
      <ButtonContainer>
        <ButtonBox>
          <Button
            size="medium"
            scheme="disabled"
            $fullWidth={true}
            onClick={handleGoBack}
          >
            이전
          </Button>
        </ButtonBox>
        <ButtonBox>
          <Button
            size="medium"
            scheme="primary"
            $fullWidth={true}
            onClick={handleGoHome}
          >
            홈
          </Button>
        </ButtonBox>
      </ButtonContainer>
    </NotFoundStyled>
  );
}

export const NotFoundStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    margin-top: 10px;
  }

  .error {
    color: ${({ theme }) => theme.color.border};
    font-size: ${({ theme }) => theme.heading.medium.fontSize};
  }

  .title {
    font-size: ${({ theme }) => theme.heading.medium.fontSize};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }

  .content {
    text-align: center;
    font-size: ${({ theme }) => theme.text.medium.fontSize};
    color: ${({ theme }) => theme.color.border};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 350px;
`;

const ButtonBox = styled.div`
  width: 170px;
`;
