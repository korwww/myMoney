import styled from 'styled-components';

interface ProgressBarProps {
  total: number;
  current: number;
}

function ProgressBar({ total, current }: ProgressBarProps) {
  return (
    <Background>
      <CurrentBar total={total} current={current} />
    </Background>
  );
}

const Background = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${({ theme }) => theme.color.background};
  position: relative;
  top: 0;
  left: 0;
`;

const CurrentBar = styled.div<ProgressBarProps>`
  width: ${({ total, current }) => `calc((100% / ${total}) * ${current})`};
  height: 4px;
  background-color: ${({ theme }) => theme.color.secondary};
`;

export default ProgressBar;
