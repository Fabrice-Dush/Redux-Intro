import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
  error: "",
  isLoading: false,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      //? necessary when you want to pass more than one argument to the action creator function
      //? as it only accepts one argument by default
      prepare: function (fullName, nationalId) {
        return {
          payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer: function (state, action) {
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalId;
      },
    },
    updateName: function (state, action) {
      state.fullName = action.payload;
    },
  },
});

export default customerSlice.reducer;

export const { createCustomer, updateName } = customerSlice.actions;
