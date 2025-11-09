'use client';
import React, { FC, useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';

const Addons: FC<IAddonsProps> = ({ addons }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold">Addons Items</h2>
      <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto mt-2">
        {addons.map((addon) => (
          // <div
          //   key={idx}
          //   onClick={() => toggleAddon(addon.name)}
          //   className={`flex justify-between items-center border p-3 rounded cursor-pointer ${
          //     selectedAddons.includes(addon.name) ? 'bg-primary text-white' : ''
          //   }`}
          // >
          //   <span>{addon.name}</span>
          //   <span>₹{addon.selling_price}</span>
          // </div>
          <div key={addon._id} className="flex justify-between items-center">
            <div>
              <h2 className="text-base font-medium">{addon.name}</h2>
            </div>
            <div className="flex gap-4 items-center">
              <p className="text-base font-semibold">₹{addon.selling_price}</p>
              <Checkbox />
            </div>
          </div>
        ))}
      </div>
      <div className="w-full mt-4">
        <Button className="w-full">Add to cart</Button>
      </div>
    </div>
  );
};

export default Addons;

interface IAddonsProps {
  addons: {
    _id: string;
    name: string;
    original_price: number;
    selling_price: number;
  }[];
}
