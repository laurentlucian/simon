import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import theme from './libs/theme';
import Fonts from './libs/fonts';
import Particles from './libs/Particles';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Particles />
      <Fonts />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
