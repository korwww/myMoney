import React from 'react';
import styled from 'styled-components';

import JoinForm from './JoinForm';
import ProgressBar from './ProgressBar';

const TOTAL_STEP = 3;

interface JoinTemplateProps {
  current: number;
  children: React.ReactNode;
  title: string;
  onSubmit: () => void;
  isValid: boolean;
}

function JoinTemplate({
  current,
  children,
  title,
  isValid,
  onSubmit,
}: JoinTemplateProps) {
  return (
    <div>
      <ProgressBar total={TOTAL_STEP} current={current} />
      <Inner>
        <TitleWrapper>
          {title.split('\\n').map((text) => (
            <Title>{text}</Title>
          ))}
        </TitleWrapper>

        <JoinForm
          onSubmit={onSubmit}
          isLastStep={current === TOTAL_STEP}
          isValid={isValid}
        >
          {children}
        </JoinForm>
      </Inner>
    </div>
  );
}
const TitleWrapper = styled.div`
  padding-top: 100px;
  margin-bottom: 35px;
`;
const Title = styled.h1`
  width: 160px;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  font-size: ${({ theme }) => theme.heading['large'].fontSize};
  line-height: 1.2;
`;
const Inner = styled.div`
  padding: ${({ theme }) => theme.padding.mainContent};
`;
export default JoinTemplate;
