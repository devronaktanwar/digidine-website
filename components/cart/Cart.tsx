'use client';

import { useCartStore } from '@/store/cartStore';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { CartApis } from '@/apis/Cart';
import { toast } from 'sonner';

const Cart = () => {
  const { cart, fetchCart, updateCart } = useCartStore();
  const params = useParams();
  const router = useRouter();
  const { cartId } = params || {};

  useEffect(() => {
    console.log({ cartId });
    if (cartId) fetchCart({ cart_id: cartId as string });
  }, [cartId]);

  if (!cart) return <div className="p-6 text-gray-500">Loading...</div>;

  const { items = [], total_amount = 0 } = cart;

  const handlePlaceOrder = async () => {
    try {
      const { data } = await CartApis.placeOrder(cartId as string);
      if (data?.isSuccess) {
        toast.success('Order Placed Successfully');
        setTimeout(() => {
          router.push('/my-orders');
        }, 1000);
      }
    } catch (err) {
      console.log('Error:', err);
      toast.error('Error occured');
    }
  };

  if (items.length === 0)
    return (
      <div className="p-6 text-gray-700 text-lg text-center">
        Your cart is empty
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

      <div className="space-y-4">
        {items.map((item: any) => (
          <div
            key={item.menu_item_id}
            className="border p-4 rounded-xl shadow-sm bg-white"
          >
            <div className="flex items-start gap-4">
              <img
                src={item.menu_item.image}
                alt={item.menu_item.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.menu_item.name}</h3>

                {item.addons?.length > 0 && (
                  <div className="text-sm text-gray-600 mt-1">
                    Addons:
                    {item.addons.map((addon: any) => (
                      <span
                        key={addon._id}
                        className="ml-2 bg-gray-100 px-2 py-1 rounded"
                      >
                        {addon.name + ' '} +₹{addon.selling_price}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-2 font-medium">₹{item.item_total}</div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() =>
                      updateCart(
                        item.menu_item_id,
                        -1,
                        cart.business_id,
                        item.addons.map((a: any) => a._id)
                      )
                    }
                    className="w-8 h-8 flex items-center justify-center border rounded-lg text-lg"
                  >
                    -
                  </button>

                  <span className="text-lg">{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateCart(
                        item.menu_item_id,
                        +1,
                        cart.business_id,
                        item.addons.map((a: any) => a._id)
                      )
                    }
                    className="w-8 h-8 flex items-center justify-center border rounded-lg text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="text-xl font-semibold text-right mt-6">
          Total: ₹{total_amount}
        </div>
        <div className="w-full">
          <Button className="w-full" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
