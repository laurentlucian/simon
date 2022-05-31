import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import theme from './libs/theme';
import Particles from './libs/Particles';
import Fonts from './libs/Fonts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Particles />
      <Fonts />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
