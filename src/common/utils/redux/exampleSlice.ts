import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@utils/redux/store";

// declaring the types for our state
export type ExampleState = {
	value: number;
};

const initialState: ExampleState = {
	value: 0,
};

export const exampleSlice = createSlice({
	name: "example",
	initialState,
	reducers: {
		// mutating all the day! Redux toolkit uses immer, so we simply mutate the store
		increment: (state) => {
			state.value++;
		},
		decrement: (state) => {
			state.value--;
		},
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload;
		},
	},
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { increment, decrement, incrementByAmount } = exampleSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectExample = (state: RootState) => state.example.value;

// exporting the reducer here, as we need to add this to the store
export default exampleSlice.reducer;
