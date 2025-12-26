const initialState = {
  balance: 0,
  loanBalance: 0,
  loanPurpose: "",
  error: "",
  isLoading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        isLoading: false,
        balance: state.balance + action.payload,
      };

    case "account/withdraw":
      if (action.payload > state.balance) return state;
      return {
        ...state,
        isLoading: false,
        balance: state.balance - action.payload,
      };

    case "account/requestLoan":
      if (state.loanBalance || action.payload.amount > state.balance)
        return state;

      return {
        ...state,
        isLoading: false,
        balance: state.balance + action.payload.amount,
        loanBalance: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };

    case "account/payLoan":
      return {
        ...state,
        isLoading: false,
        balance: state.balance - state.loanBalance,
        loanBalance: 0,
        loanPurpose: "",
      };

    case "loading":
      return { ...state, isLoading: true };

    case "error":
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
}

//? action creators
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  //? thunks to make api call
  return async function (dispatch, getState) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(
        `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
      );

      const data = await res.json();
      const convertedAmount = amount * data.rates["USD"];
      console.log(convertedAmount);

      setTimeout(() => {
        dispatch({ type: "account/deposit", payload: convertedAmount });
      }, 3000);
    } catch (err) {
      dispatch({ type: "error", payload: err.message ?? err });
    }
  };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
