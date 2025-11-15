'use client';
import React, { FC } from 'react';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';

const Addons: FC<IAddonsProps> = ({
  addons,
  selectedAddons,
  setSelectedAddons,
  handleAddToCart,
}) => {
  const handleSelectAddons = (addonId: string, checked: boolean) => {
    if (checked) {
      setSelectedAddons((prev: string[]) => {
        if (!prev.includes(addonId)) {
          return [...prev, addonId];
        }
        return prev;
      });
    } else {
      setSelectedAddons((prev: string[]) =>
        prev.filter((id) => id !== addonId)
      );
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold">Addons Items</h2>
      <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto mt-2">
        {addons.map((addon) => {
          const isChecked = selectedAddons.includes(addon._id);

          return (
            <div key={addon._id} className="flex justify-between items-center">
              <div>
                <h2 className="text-base font-medium">{addon.name}</h2>
              </div>
              <div className="flex gap-4 items-center">
                <p className="text-base font-semibold">
                  ₹{addon.selling_price}
                </p>
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={(checked) =>
                    handleSelectAddons(addon._id, Boolean(checked))
                  }
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full mt-4">
        <Button className="w-full" onClick={handleAddToCart}>
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default Addons;

interface IAddonsProps {
  addons: IAddon[];
  selectedAddons: string[];
  setSelectedAddons: (val: (prev: string[]) => string[]) => void;
  handleAddToCart: () => void;
}

export type IAddon = {
  _id: string;
  name: string;
  original_price: number;
  selling_price: number;
};
