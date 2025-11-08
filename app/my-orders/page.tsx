import MyOrders from '@/components/my-orders/MyOrders';
import { Navbar } from '@/components/navbar/Navbar';
import React from 'react';

const page = () => {
  return (
    <div>
      <Navbar />
      <MyOrders />
    </div>
  );
};

export default page;
