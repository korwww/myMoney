import styled from 'styled-components';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Main id="main">{children}</Main>
    </>
  );
}

const Main = styled.div`
  /* max-width: 768px; */
  /* width: 390px; */
  /* margin: 0 auto; */
  padding: ${({ theme }) => theme.contentPadding};
`;
export default Layout;
