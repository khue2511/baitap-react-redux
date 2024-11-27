import React from 'react';
import { CartItem as CartItemType } from '../../types/cartTypes';
import DeleteIcon from '@mui/icons-material/Delete';

interface CartItemProps {
  item: CartItemType;
  onRemove: (productId: string) => void;
  onQuantityChange: (productId: string, newQuantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemove,
  onQuantityChange,
}) => {
  const { product, quantity } = item;

  const handleQuantityIncrease = () => {
    onQuantityChange(product.id, quantity + 1);
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(product.id, quantity - 1);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-100">
      <div>
        {/* Product image */}
        <img
          className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg"
          src={product.imageUrl}
          alt={product.name}
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 ml-4">
        <p className="text-sm text-gray-400 mt-1">Product ID: {product.id}</p>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <h3 className="text-lg text-gray-500">${product.price}</h3>
      </div>

      {/* Quantity Controls and Delete Button */}
      <div className="flex items-center gap-4 scale-75 md:scale-100">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleQuantityDecrease}
            className="w-8 h-8 flex items-center justify-center text-white bg-gray-500 rounded-full hover:bg-gray-600 disabled:bg-gray-300"
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="w-10 h-10 flex items-center justify-center text-lg font-semibold border rounded-md border-gray-300">
            {quantity}
          </span>
          <button
            onClick={handleQuantityIncrease}
            className="w-8 h-8 flex items-center justify-center text-white bg-gray-500 rounded-full hover:bg-gray-600 disabled:bg-gray-300"
            disabled={quantity === product.quantity}
          >
            +
          </button>
        </div>

        <button
          onClick={() => onRemove(product.id)}
          className="text-red-500 hover:text-red-700"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
