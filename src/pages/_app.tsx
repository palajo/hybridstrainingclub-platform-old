import React from 'react';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';

import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#17E4B1',
      },
      components: {
        Button: {
          colorPrimary: '#00b96b',
          algorithm: true, // Enable algorithm
        },
        Input: {
          colorPrimary: '#eb2f96',
          algorithm: true, // Enable algorithm
        },
        Layout: {
          siderBg: '#0E2420',
          triggerBg: '#0E3B32',
        },
        Menu: {
          darkItemBg: '#0E2420',
          darkSubMenuItemBg: '#0E3B32',
          darkPopupBg: '#0E3B32'
        },
      },
    }}
  >
    <Component {...pageProps} />
  </ConfigProvider>
);

export default App;
