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
      // Find if the item already exists in the cart
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.id,
      );

      // Available stock of the product
      const availableStock = action.payload.quantity;

      // If the item already exists in the cart
      if (existingCartItemIndex >= 0) {
        const currentCartItem = state.items[existingCartItemIndex];
        const currentQuantity = currentCartItem.quantity;

        // If current quantity is less than available stock, increase the quantity
        if (currentQuantity < availableStock) {
          currentCartItem.quantity += 1;
          state.totalAmount += action.payload.price;
        }
      } else {
        // If the item does not exist in the cart, add it
        if (availableStock > 0) {
          state.items.push({ product: action.payload, quantity: 1 });
          state.totalAmount += action.payload.price;
        }
      }
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      // Find the item to remove by its ID
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.product.id === action.payload,
      );

      // If the item exists in the cart, remove it and adjust the total amount
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
      // Find the item to update by its ID
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.productId,
      );

      // If the item exists in the cart
      if (existingCartItemIndex >= 0) {
        const itemToUpdate = state.items[existingCartItemIndex];
        const availableStock = itemToUpdate.product.quantity;

        // If the new quantity is within the available stock, update it and adjust the total amount
        if (action.payload.quantity <= availableStock) {
          const priceDifference =
            (action.payload.quantity - itemToUpdate.quantity) *
            itemToUpdate.product.price;
          itemToUpdate.quantity = action.payload.quantity;
          state.totalAmount += priceDifference;
        }
      }
    },
    resetCart: () => initialState,
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
