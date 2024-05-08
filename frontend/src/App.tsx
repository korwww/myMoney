import { ThemeProvider } from 'styled-components';

import { theme } from './style/theme';
import { GlobalStyle } from './style/global';
import { Router } from './Router';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </div>
  );
}

export default App;
