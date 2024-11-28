import React from 'react';
import { OrderItem } from '../../types/orderTypes';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

interface OrderDetailCardProps {
  items: OrderItem[];
  totalAmount: number;
  status: string;
  id: string;
  onCancelOrder: (id: string) => void;
}



const OrderDetailCard: React.FC<OrderDetailCardProps> = ({
  items,
  totalAmount,
  status,
  id,
  onCancelOrder
}) => {
  const handleCancelOrder = () => {
    onCancelOrder(id);
  }

  return (
    <div className="border rounded shadow-lg">
      <p className="flex items-center gap-x-2 p-4 border-b">
        <span className="text-lg font-bold"> Order ID: {id}</span>
        <span className="font-semibold text-xs bg-zinc-200 px-3.5 py-1 rounded-3xl">
          {status}
        </span>
      </p>

      <div className="border-b grid grid-cols-5 bg-zinc-100 p-4">
        <span className="col-span-2 font-semibold text-blue-900">
          Product Name
        </span>
        <span className="text-right font-semibold text-blue-900">Quantity</span>
        <span className="text-right font-semibold text-blue-900">Price</span>
        <span className="text-right font-semibold text-blue-900">Total</span>
      </div>
      <div className="flex flex-col gap-y-4">
        {items.map((item) => (
          <div
            className="border-b grid grid-cols-5 p-4"
            key={item.product.id}
          >
            <div className="flex col-span-2 gap-x-4">
              <img
                className="w-24 h-24 rounded"
                src={item.product.imageUrl}
                alt={item.product.name}
              />
              <div>
                <p className="text-sm text-gray-400">
                  Product ID: {item.product.id}
                </p>
                <p className="text-lg font-semibold">{item.product.name}</p>
              </div>
            </div>

            <p className="text-right">{item.quantity}</p>
            <p className="text-right">${item.product.price}</p>
            <p className="font-semibold text-right">
              ${item.product.price * item.quantity}
            </p>
          </div>
        ))}
      </div>
      <div className="border-b grid grid-cols-5 p-4">
        <p className="col-start-4 col-end-5 text-right font-semibold">
          Total Amount:
        </p>
        <span className="text-right text-xl font-bold">${totalAmount}</span>
      </div>
      <div className="flex justify-end gap-x-4 border-b p-4">
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-100" onClick={handleCancelOrder}>
          Cancel Order
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-100">
          <ShoppingCartCheckoutIcon />  Checkout
        </button>
      </div>
    </div>
  );
};

export default OrderDetailCard;
