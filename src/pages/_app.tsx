import React, { useCallback, useEffect, useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import type { AppProps } from 'next/app';
import RootLayout from '@/layouts/RootLayout';
import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(window.matchMedia("(prefers-color-scheme:dark)").matches ? true : false);
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#17E4B1',
        },
        components: {
          Button: {
            colorPrimary: '#17E4B1',
            algorithm: true, // Enable algorithm
          },
          Input: {
            colorPrimary: '#17E4B1',
            algorithm: true, // Enable algorithm
          },
          Layout: {
            siderBg: '#0E2420',
            triggerBg: '#0E3B32',
          },
          Menu: {
            darkItemBg: '#0E2420',
            darkSubMenuItemBg: '#0E3B32',
            darkPopupBg: '#0E3B32',
          },
          Anchor: {
            colorPrimary: '#17E4B1',
          },
        },
      }}
    >
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </ConfigProvider>
  );
};

export default App;
