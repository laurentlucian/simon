import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  },
  styles: {
    global: {
      body: {
        color: '#EEE6E2',
        bg: '#000000',
      },
    },
  },
  components: {
    Button: {},
  },
  fonts: {
    heading: 'MonoLisa Bold, sans-serif',
    body: 'MonoLisa, sans-serif',
  },
});

export default theme;
