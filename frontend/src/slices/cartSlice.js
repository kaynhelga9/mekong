import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
	? JSON.parse(localStorage.getItem("cart"))
	: { cartItems: [] };

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const item = action.payload;

			const existItem = state.cartItems.find((x) => x._id === item._id);

			if (existItem) {
				existItem.qty += item.qty;
				return updateCart(state);
			} else {
				state.cartItems = [...state.cartItems, item];
			}

			return updateCart(state);
		},
		setCart: (state, action) => {
			const item = action.payload;

			const existItem = state.cartItems.find((x) => x._id === item._id);

			if (existItem) {
				existItem.qty = item.qty;
				return updateCart(state);
			} else {
				state.cartItems = [...state.cartItems, item];
			}

			return updateCart(state);
		},
		removeFromCart: (state, action) => {
			state.cartItems = state.cartItems.filter(
                (x) => x._id !== action.payload
            );
            return updateCart(state);
		}
	},
});

export const { addToCart, setCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
