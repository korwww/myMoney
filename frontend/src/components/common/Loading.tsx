import styled, { keyframes } from 'styled-components';

function Loading() {
  return (
    <Loader>
      <span></span>
      <span></span>
      <span></span>
    </Loader>
  );
}

const Bounce = keyframes`
    0%,75%,100%{
        transform:translateY(0);
    }
    25%{
        transform: translateY(-20px);
    }
`;

const Loader = styled.div`
  span {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-color: ${({ theme }) => theme.color.primary};
    margin: 35px 5px;
    border-radius: 100%;
    animation: ${Bounce} 1s ease-in-out infinite;
    &:nth-child(2) {
      animation-delay: 0.33s;
    }
    &:nth-child(3) {
      animation-delay: 0.66s;
    }
  }
`;

export default Loading;
