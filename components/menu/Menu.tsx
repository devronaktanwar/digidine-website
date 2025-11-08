'use client';
import { MenuApis } from '@/apis/Menu';
import { IMenuItemProps } from '@/types/Menu';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import MenuItemCard from './MenuItemCard';
import { useCartStore } from '@/store/cartStore';

const Menu = () => {
  const [menu, setMenu] = useState<IMenuItemProps[]>([]);
  const { cart, fetchCart } = useCartStore();
  const params = useParams();
  const { businessId } = params || {};
  const router = useRouter();

  const fetchMenuItems = async () => {
    const response = await MenuApis.getMenuItems({
      business_id: businessId as string,
    });
    setMenu(response?.data || []);
  };

  useEffect(() => {
    fetchMenuItems();
    fetchCart(businessId as string);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-col gap-3 p-2">
        {menu?.map((ele) => (
          <MenuItemCard key={ele._id} {...ele} />
        ))}
      </div>

      {cart && cart.items?.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md p-4 flex justify-between items-center">
          <div>
            <p className="font-medium text-gray-700">
              {cart.items.length} item(s)
            </p>
            <p className="font-bold text-lg">₹{cart.totalAmount}</p>
          </div>
          <button
            onClick={() => router.push(`/cart/${cart._id}`)}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            View Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
