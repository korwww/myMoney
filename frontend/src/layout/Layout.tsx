import styled from 'styled-components';

import Navigation from './Navigation';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  showBackButton: boolean;
  title?: string;
}

function Layout({ children, showBackButton, title }: LayoutProps) {
  return (
    <div>
      <Header title={title} showBackButton={showBackButton} />
      <Main id="main">{children}</Main>
      <Navigation />
    </div>
  );
}

const Main = styled.div`
  /* max-width: 768px; */
  width: 390px;
  margin: 0 auto;
`;
export default Layout;
