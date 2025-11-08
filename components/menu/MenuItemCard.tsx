'use client';
import { useCartStore } from '@/store/cartStore';
import { IMenuItemProps } from '@/types/Menu';
import Image from 'next/image';
import React, { FC } from 'react';
import { SiSquare } from 'react-icons/si';
import { twMerge } from 'tailwind-merge';
import { Button } from '../ui/button';

const MenuItemCard: FC<IMenuItemProps> = (data) => {
  const {
    _id,
    image,
    label,
    description,
    original_price,
    selling_price,
    type,
    status,
    business_id,
  } = data || {};

  const { cart, updateCart } = useCartStore();

  const existingItem = cart?.items?.find((i) => i.menuItemId === _id);
  const quantity = existingItem?.quantity || 0;

  return (
    <div className="flex justify-between border p-2 rounded-xl items-center">
      <div className="flex gap-4 items-center">
        <div>
          {image ? (
            <div className="w-[60px] h-[60px] rounded-full overflow-hidden shadow-lg">
              <Image
                src={image}
                alt={label}
                width={60}
                height={60}
                className="rounded-full object-cover"
              />
            </div>
          ) : (
            <div className="w-[100px] h-[100px] flex justify-center items-center bg-gray-100 text-gray-700 text-3xl font-semibold rounded-full shadow-inner">
              {label?.charAt(0)?.toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <div className='flex items-center gap-2'>
            <SiSquare
              className={twMerge(
                type === 'VEG' ? 'text-green-500' : 'text-red-500'
              )}
            />
            <h2 className="font-semibold text-lg">{label}</h2>
          </div>
          <p>₹{selling_price}</p>
        </div>
      </div>
      <div>
        {quantity === 0 ? (
          <Button
            onClick={() => updateCart(_id, 1, business_id)}
            className="bg-primary text-white px-3 py-1 rounded-md text-sm"
          >
            Add
          </Button>
        ) : (
          <div className="flex items-center gap-4 border rounded-full px-4 py-1">
            <button
              onClick={() => updateCart(_id, -1, business_id)}
              className="text-lg font-semibold cursor-pointer"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => updateCart(_id, 1, business_id)}
              className="text-lg font-semibold cursor-pointer"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;
