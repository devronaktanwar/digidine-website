import MyProfile from '@/components/my-profile/MyProfile';
import { Navbar } from '@/components/navbar/Navbar';
import React from 'react';

const page = () => {
  return (
    <div>
      <Navbar />
      <MyProfile />
    </div>
  );
};

export default page;
