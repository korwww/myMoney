import { ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';

import { theme } from './style/theme';
import { GlobalStyle } from './style/global';
import { router } from './Router';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
