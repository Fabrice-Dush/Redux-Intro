import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loanBalance: 0,
  loanPurpose: "",
  error: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      //? necessary when you want to pass more than one argument to the action creator function
      //? as it only accepts one argument by default
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        state.loanBalance = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loanBalance;
      state.loanBalance = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
    error(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export default accountSlice.reducer;

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  //? thunks to make api call
  return async function (dispatch, getState) {
    try {
      dispatch({ type: "account/convertingCurrency" });
      const res = await fetch(
        `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
      );

      const data = await res.json();
      const convertedAmount = amount * data.rates["USD"];

      dispatch({ type: "account/deposit", payload: convertedAmount });
    } catch (err) {
      console.error("⛔⛔⛔");
      dispatch({ type: "error", payload: err.message ?? err });
    }
  };
}
