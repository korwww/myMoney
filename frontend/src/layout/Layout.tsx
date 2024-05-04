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
      {children}
      <Navigation />
    </div>
  );
}

export default Layout;
