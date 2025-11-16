'use client';
import { useCartStore } from '@/store/cartStore';
import { IMenuItemProps } from '@/types/Menu';
import Image from 'next/image';
import React, { FC, useState } from 'react';
import { SiSquare } from 'react-icons/si';
import { twMerge } from 'tailwind-merge';
import { Button } from '../ui/button';
import CommonDrawer from '@/common/components/CommonDrawer';
import Addons, { IAddon } from './Addons';
import { useParams } from 'next/navigation';

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
    addons,
  } = data || {};

  const { cart, updateCart, fetchCart } = useCartStore();
  const [openAddon, setOpenAddon] = useState<boolean>(false);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const existingItem = cart?.items?.find((i) => i.menu_item_id === _id);
  const quantity = existingItem?.quantity || 0;
  const existingAddons = existingItem?.addons || [];

  const params = useParams();
  const { businessId } = params || {};

  const handleUpdateItem = () => {
    if (addons.length) {
      setOpenAddon(true);
      setSelectedAddons(existingAddons);
      return;
    }
    updateCart(_id, 1, business_id, selectedAddons);
    fetchCart({ business_id: businessId as string });
  };

  const handleAddToCart = () => {
    updateCart(_id, 1, business_id, selectedAddons);
    fetchCart({ business_id: businessId as string });
  };

  return (
    <>
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
            <div className="flex items-center gap-2">
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
        <div className="flex justify-center flex-col gap-1">
          {quantity === 0 ? (
            <Button
              onClick={() => handleUpdateItem()}
              className="bg-primary text-white px-3 py-1 rounded-md text-sm"
            >
              Add
            </Button>
          ) : (
            <div className="flex items-center gap-4 border rounded-full px-4 py-1">
              <button
                onClick={() => {
                  updateCart(_id, -1, business_id, addons as any);
                  fetchCart({ business_id: businessId as string });
                }}
                className="text-lg font-semibold cursor-pointer"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => {
                  updateCart(_id, 1, business_id, addons as any);
                  fetchCart({ business_id: businessId as string });
                }}
                className="text-lg font-semibold cursor-pointer"
              >
                +
              </button>
            </div>
          )}
          {addons?.length > 0 && (
            <p className="text-xs font-medium text-center">Customizable</p>
          )}
        </div>
      </div>
      <CommonDrawer
        isOpen={openAddon}
        onClose={() => setOpenAddon(false)}
        title={label}
      >
        <Addons
          addons={addons}
          selectedAddons={selectedAddons}
          setSelectedAddons={setSelectedAddons}
          handleAddToCart={handleAddToCart}
        />
      </CommonDrawer>
    </>
  );
};

export default MenuItemCard;
