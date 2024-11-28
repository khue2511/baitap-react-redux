import React, { useEffect, useState } from 'react';
import { Order } from '../../types/orderTypes';
import axios, { AxiosResponse } from 'axios';
import OrderDetailCard from './OrderDetailCard';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const url = 'https://673d96620118dbfe8607db5e.mockapi.io/api';

  const getOrders = async () => {
    try {
      const response: AxiosResponse<Order[]> = await axios.get(`${url}/orders`);
      setOrders(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleCancelOrder = async (orderId: string) => {
    try {
      await axios.delete(`${url}/orders/${orderId}`);
      window.location.reload();
    }  catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div className="container mx-auto mb-4">
      <h1 className="text-3xl font-bold my-4">Your Orders</h1>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-solid border-gray-200 border-t-gray-500 rounded-full" />
        </div>
      ) : (
        <div>
          {orders.length === 0 ? (
            <h1>You do not have any orders</h1>
          ) : (
            <div className='flex flex-col gap-y-8'>
              {orders.map((order) => (
                <OrderDetailCard
                  key={order.id}
                  id={order.id}
                  items={order.items}
                  totalAmount={order.totalAmount}
                  status={order.status}
                  onCancelOrder={() => handleCancelOrder(order.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
