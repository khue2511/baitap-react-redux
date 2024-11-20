import { IconButton } from '@mui/material';
import React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface ProductCardProps {
  name: string;
  quantity: number;
  price: number;
  description: string;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  quantity,
  price,
  description,
  imageUrl,
}) => {
  return (
    <div className="flex flex-col border w-72">
      <div className="">
        <img
          className="w-full h-auto"
          src={imageUrl}
          alt={name}
        ></img>
      </div>
      <div className="flex flex-col p-4 gap-y-1">
        <p className="text-3xl font-bold">${price}</p>
        <h3 className="text-xl font-bold">{name}</h3>
        <p>{description}</p>
        <div className="flex flex-row justify-between items-center">
          <p className='text-sm'>Quantity: {quantity}</p>
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
          >
            <AddShoppingCartIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
