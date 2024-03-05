import React from 'react';
import Head from 'next/head';

import Calendar from '@/components/Calendar/Calendar';

const Homepage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Program Builder – HTC Platform</title>
      </Head>
      <Calendar/>
    </>
  );
};

export default Homepage;
