import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  removeItemFromCart,
  updateItemQuantity,
  // resetCart,
} from '../../redux/cartSlice';
import CartItem from './CartItem';

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

  return (
    <div className="container mx-auto my-4 p-4 border rounded-md shadow-lg">
      {/* <button onClick={() => dispatch(resetCart())}>Reset cart</button> */}
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
            <h2 className="text-xl font-bold mt-4">Total Amount: ${totalAmount}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
