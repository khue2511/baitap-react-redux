import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState } from '../types/cartTypes';
import { Product } from '../types/productTypes';

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Product>) => {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.id,
      );

      const availableStock = action.payload.quantity;

      if (existingCartItemIndex >= 0) {
        const currentCartItem = state.items[existingCartItemIndex];
        const currentQuantity = currentCartItem.quantity;

        if (currentQuantity < availableStock) {
          currentCartItem.quantity += 1;
          state.totalAmount += action.payload.price;
        }
      } else {
        if (availableStock > 0) {
          state.items.push({ product: action.payload, quantity: 1 });
          state.totalAmount += action.payload.price;
        }
      }

      state.totalAmount += action.payload.price;
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.product.id === action.payload,
      );

      if (existingCartItemIndex >= 0) {
        const itemToRemove = state.items[existingCartItemIndex];
        state.totalAmount -= itemToRemove.product.price * itemToRemove.quantity;
        state.items.splice(existingCartItemIndex, 1);
      }
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) => {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.productId,
      );

      if (existingCartItemIndex >= 0) {
        const itemToUpdate = state.items[existingCartItemIndex];
        const availableStock = itemToUpdate.product.quantity;
        if (action.payload.quantity <= availableStock) {
          const priceDifference =
            (action.payload.quantity - itemToUpdate.quantity) *
            itemToUpdate.product.price;
          itemToUpdate.quantity = action.payload.quantity;
          state.totalAmount += priceDifference;
        }
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateItemQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
