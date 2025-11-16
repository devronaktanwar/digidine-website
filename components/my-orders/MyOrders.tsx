'use client';

import { useOrders } from '@/store/customerStore';
import React, { useEffect, useState } from 'react';
import { ChevronDown, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface OrderItem {
  _id: string;
  label: string;
  description: string;
  original_price: number;
  selling_price: number;
  quantity: number;
  addons: Array<{
    _id: string;
    name: string;
    original_price: number;
    selling_price: number;
  }>;
}

interface Order {
  _id: string;
  order_id: string;
  table_no: string;
  order_status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  payment_status: 'PENDING' | 'PAID' | 'FAILED';
  items: OrderItem[];
  total_amount: number;
  createdAt: string;
  updatedAt: string;
}

const MyOrders = () => {
  const { orders, fetchOrders } = useOrders((state: any) => state);
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);

  console.log({ orders });
  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'PENDING':
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const calculateItemTotal = (item: OrderItem) => {
    const itemTotal = item.selling_price * item.quantity;
    const addonsTotal = item.addons.reduce(
      (sum, addon) => sum + addon.selling_price * item.quantity,
      0
    );
    return itemTotal + addonsTotal;
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            No Orders Yet
          </h2>
          <p className="text-muted-foreground">
            You haven't placed any orders yet. Start shopping to see your orders
            here!
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">My Orders</h1>
          <p className="text-muted-foreground">
            {orders.length} order{orders.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="space-y-4">
          {orders.map((order: Order) => (
            <Card
              key={order._id}
              className="overflow-hidden border border-border hover:border-primary/50 transition-colors"
            >
              {/* Order Header */}
              <button
                onClick={() => toggleOrderExpand(order._id)}
                className="w-full p-6 flex items-center justify-between hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {order.order_id}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        Table {order.table_no}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">
                        ₹{order.total_amount}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.order_status
                          )}`}
                        >
                          {getStatusIcon(order.order_status)}
                          {order.order_status}
                        </span>
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.payment_status
                          )}`}
                        >
                          {order.payment_status}
                        </span>
                      </div>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground transition-transform ${
                        expandedOrders.includes(order._id) ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>
              </button>

              {/* Order Details - Expandable */}
              {expandedOrders.includes(order._id) && (
                <div className="border-t border-border bg-secondary/10 p-6">
                  <div className="space-y-6">
                    {/* Items List */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-4">
                        Order Items
                      </h4>
                      <div className="space-y-4">
                        {order.items.map((item: OrderItem) => (
                          <div
                            key={item._id}
                            className="bg-background border border-border rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <h5 className="font-medium text-foreground">
                                  {item.label}
                                </h5>
                                <p className="text-sm text-muted-foreground line-clamp-1">
                                  {item.description}
                                </p>
                              </div>
                              <div className="text-right ml-4">
                                <div className="text-sm font-medium text-foreground">
                                  Qty: {item.quantity}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  ₹{calculateItemTotal(item)}
                                </div>
                              </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="text-xs text-muted-foreground space-y-1 mt-2 pt-2 border-t border-border">
                              <div className="flex justify-between">
                                <span>
                                  Item: ₹{item.selling_price} × {item.quantity}
                                </span>
                                <span>
                                  ₹{item.selling_price * item.quantity}
                                </span>
                              </div>
                              {item.addons.length > 0 && (
                                <>
                                  <div className="font-medium text-foreground mt-2">
                                    Add-ons:
                                  </div>
                                  {item.addons.map((addon) => (
                                    <div
                                      key={addon._id}
                                      className="flex justify-between pl-2"
                                    >
                                      <span>
                                        {addon.name}: ₹{addon.selling_price} ×{' '}
                                        {item.quantity}
                                      </span>
                                      <span>
                                        ₹{addon.selling_price * item.quantity}
                                      </span>
                                    </div>
                                  ))}
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-background border border-border rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-3">
                        Order Summary
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-muted-foreground">
                          <span>Subtotal</span>
                          <span>₹{order.total_amount}</span>
                        </div>
                        <div className="border-t border-border pt-2 flex justify-between font-semibold text-foreground">
                          <span>Total Amount</span>
                          <span className="text-lg">₹{order.total_amount}</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="bg-background border border-border rounded p-3">
                        <p className="text-muted-foreground text-xs mb-1">
                          Order ID
                        </p>
                        <p className="font-mono text-foreground text-xs">
                          {order.order_id}
                        </p>
                      </div>
                      <div className="bg-background border border-border rounded p-3">
                        <p className="text-muted-foreground text-xs mb-1">
                          Order Status
                        </p>
                        <p className="font-medium text-foreground">
                          {order.order_status}
                        </p>
                      </div>
                      <div className="bg-background border border-border rounded p-3">
                        <p className="text-muted-foreground text-xs mb-1">
                          Payment Status
                        </p>
                        <p className="font-medium text-foreground">
                          {order.payment_status}
                        </p>
                      </div>
                      <div className="bg-background border border-border rounded p-3">
                        <p className="text-muted-foreground text-xs mb-1">
                          Ordered On
                        </p>
                        <p className="text-xs text-foreground">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
