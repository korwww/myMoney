import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';

import Button from '@/components/common/Button';
import AlertText from '../common/AlertText';
import ErrorTemplate from './ErrorTemplate';
import { ButtonContainer } from './ErrorTemplate.style';
import { handleGoHome } from '@/utils/routingUtils';

interface ForbiddenErrorProps {
  error: AxiosError<any, any>;
}

export default function ForbiddenError({ error }: ForbiddenErrorProps) {
  const { response } = error;
  const [remainingDays, setRemainingDays] = useState<string>('');
  const { reportCount, suspensionRemainingDays } = response?.data;
  const isBanned = reportCount >= 5 ? '영구' : '일시';
  const targetTime = dayjs().add(suspensionRemainingDays, 'second');

  useEffect(() => {
    if (isBanned === '영구' || !suspensionRemainingDays) return;

    const interval = setInterval(() => {
      const now = dayjs();
      const remainingTime = targetTime.diff(now, 'second');

      const days = Math.floor(remainingTime / (24 * 3600));
      const hours = Math.floor((remainingTime % (24 * 3600)) / 3600);
      const minutes = Math.floor((remainingTime % 3600) / 60);
      const seconds = remainingTime % 60;

      let countdownText = '';
      if (days > 0) {
        countdownText += `${days}일 `;
      }
      if (hours > 0 || countdownText !== '') {
        countdownText += `${hours}시간 `;
      }
      if (minutes > 0 || countdownText !== '') {
        countdownText += `${minutes}분 `;
      }
      if (seconds > 0 || countdownText === '') {
        countdownText += `${seconds}초`;
      }

      setRemainingDays(countdownText);
    }, 1000);
    return () => clearInterval(interval);
  }, [suspensionRemainingDays]);

  return (
    <ErrorTemplate
      title={`${isBanned} 정지된 계정입니다.`}
      content={`이 계정은 내돈내산의 운영원칙을 위반했으므로 ${isBanned} 정지되었습니다.`}
    >
      {isBanned === '일시' && (
        <AlertText size="medium">정지 종료까지 {remainingDays} 남음</AlertText>
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
