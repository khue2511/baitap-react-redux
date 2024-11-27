import { IconButton } from '@mui/material';
import React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../redux/cartSlice';
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
  const isInCart = cartItems.some((item) => item.product.id === id);
  const handleAddToCart = () => {
    dispatch(
      addItemToCart({ id, name, quantity, price, description, imageUrl }),
    );
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
          <p className="text-3xl font-bold">
            ${price}{' '}
            {isInCart && (
              <span className="text-xs text-green-500">Already in cart</span>
            )}
          </p>
          <h3 className="text-xl font-bold">{name}</h3>
          <p>{description}</p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-sm">Quantity: {quantity}</p>
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            onClick={handleAddToCart}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
