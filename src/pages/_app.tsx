import React, { useCallback, useEffect, useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import type { AppProps } from 'next/app';
import RootLayout from '@/layouts/RootLayout';
import '@/styles/globals.css';
import { generate } from '@ant-design/colors';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#17E4B1',
        },
        components: {
          Button: {
            colorPrimary: '#17E4B1',
          },
          Input: {
            colorPrimary: '#17E4B1',
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
          Form: {
            colorTextLabel: '#FFFFFF'
          }
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
