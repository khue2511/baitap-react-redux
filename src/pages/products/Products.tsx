import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/common/ProductCard';
import axios, { AxiosResponse } from 'axios';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  imageUrl: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    const url = 'https://673d96620118dbfe8607db5e.mockapi.io/api';
    try {
      const response: AxiosResponse<Product[]> = await axios.get(
        `${url}/products`,
      );
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-col items-center m-auto">
      <h1 className="text-3xl font-bold mt-8">Our Products</h1>
      <div className='flex flex-row flex-wrap justify-between gap-y-8 w-10/12 mt-8 m-auto'>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            quantity={product.quantity}
            price={product.price}
            description={product.description}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
