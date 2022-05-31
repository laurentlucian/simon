import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import type { GlobalStyleProps } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  config: {
    useSystemColorMode: true,
  },
  styles: {
    global: (props: GlobalStyleProps) => ({
      body: {
        color: mode('#161616', '#EEE6E2')(props),
        bg: mode('#EEE6E2', '#131415')(props),
      },
    }),
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
