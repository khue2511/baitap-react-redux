import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/common/ProductCard';
import axios, { AxiosResponse } from 'axios';
import { Product } from '../../types/productTypes';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const url = 'https://673d96620118dbfe8607db5e.mockapi.io/api';

  const getProducts = async () => {
    try {
      const response: AxiosResponse<Product[]> = await axios.get(
        `${url}/products`,
      );
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="product-page-container flex flex-col items-center m-auto pb-12 pt-8">
      <h1 className="text-3xl font-bold">Our Products</h1>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-solid border-gray-200 border-t-gray-500 rounded-full" />
        </div>
      ) : (
        <div
          // className="flex flex-wrap gap-x-5 gap-y-5 mt-8"
          // justify-between
          className="products-list grid grid-cols-1 gap-x-6 gap-y-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              quantity={product.quantity}
              price={product.price}
              description={product.description}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
