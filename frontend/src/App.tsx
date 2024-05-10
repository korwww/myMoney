import { ThemeProvider } from 'styled-components';

import { theme } from './style/theme';
import { GlobalStyle } from './style/global';
import { Router } from './Router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/queryClient';

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
