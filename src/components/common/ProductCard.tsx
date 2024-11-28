import { IconButton } from '@mui/material';
import React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
} from '../../redux/cartSlice';
import { RootState } from '../../redux/store';

interface ProductCardProps {
  id: string;
  name: string;
  quantity: number;
  price: number;
  description: string;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  quantity,
  price,
  description,
  imageUrl,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItem = cartItems.find((item) => item.product.id === id);
  const isInCart = cartItems.some((item) => item.product.id === id);
  const handleAddToCart = () => {
    dispatch(
      addItemToCart({ id, name, quantity, price, description, imageUrl }),
    );
  };

  const handleIncrement = () => {
    if (cartItem) {
      dispatch(
        updateItemQuantity({
          productId: id,
          quantity: cartItem.quantity + 1,
        }),
      );
    }
  };

  const handleDecrement = () => {
    if (cartItem) {
      if (cartItem.quantity > 1) {
        dispatch(
          updateItemQuantity({
            productId: id,
            quantity: cartItem.quantity - 1,
          }),
        );
      } else {
        dispatch(removeItemFromCart(id));
      }
    }
  };

  return (
    <div className="product-card flex flex-col border max-w-72 rounded-md shadow-lg p-4">
      <div className="">
        <img
          className="w-full h-auto"
          src={imageUrl}
          alt={name}
        ></img>
      </div>
      <div className="flex flex-col justify-between mt-4 gap-y-1 h-full">
        <div>
          <p className="text-3xl font-bold">${price}</p>
          <h3 className="text-xl font-bold">{name}</h3>
          <p>{description}</p>
        </div>
        <div className="flex flex-row justify-between items-center pt-4">
          <p className="text-sm">Quantity: {quantity}</p>
          {isInCart ? (
            <div className="flex items-center gap-x-1">
              <button
                className="border border-gray-400 rounded w-7 h-7"
                onClick={handleDecrement}
              >
                -
              </button>
              <span className='w-7 h-7 text-center'>{cartItem?.quantity}</span>
              <button
                className="border border-gray-400 rounded w-7 h-7 disabled:cursor-not-allowed disabled:text-gray-300 disabled:border-gray-300"
                onClick={handleIncrement}
                disabled={quantity === cartItem?.quantity}
              >
                +
              </button>
            </div>
          ) : (
            <IconButton
              color="primary"
              aria-label="add to shopping cart"
              onClick={handleAddToCart}
            >
              <AddShoppingCartIcon />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
