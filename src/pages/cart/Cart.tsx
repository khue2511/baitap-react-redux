import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  removeItemFromCart,
  updateItemQuantity,
  resetCart,
} from '../../redux/cartSlice';
import CartItem from './CartItem';
import axios from 'axios';

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);

  const dispatch = useDispatch();

  const handleRemoveItem = (productId: string) => {
    dispatch(removeItemFromCart(productId));
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateItemQuantity({ productId, quantity: newQuantity }));
    }
  };

  const createOrder = async () => {
    const orderData = {
      items: cartItems,
      totalAmount,
      status: 'pending', 
    };

    try {
      const response = await axios.post(
        'https://673d96620118dbfe8607db5e.mockapi.io/api/orders',
        orderData,
      );

      if (response.status === 201) {
        alert('Order placed successfully!');
        dispatch(resetCart()); 
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('There was an error placing your order. Please try again.');
    }
  };

  return (
    <div className="container mx-auto my-4 p-4 border rounded-md shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              onRemove={handleRemoveItem}
              onQuantityChange={handleQuantityChange}
            />
          ))}
          <div className="text-right">
            <h2 className="text-xl font-bold mt-4">
              Total Amount: ${totalAmount}
            </h2>
          </div>
          <button
            className="block ml-auto mt-4 px-4 py-2 border bg-black text-white hover:bg-white hover:text-black transition duration-100"
            onClick={createOrder}
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
