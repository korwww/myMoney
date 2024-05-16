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
    <Container>
      <Header title={title} showBackButton={showBackButton} />
      <div id="main">{children}</div>
      <Navigation />
    </Container>
  );
}

const Container = styled.div`
  max-width: 390px;
  margin-inline: auto;
  padding-bottom: 85px;
`;
export default Layout;
