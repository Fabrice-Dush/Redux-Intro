import { createStore } from "redux";

const initialStateAccount = {
  customer: { fullName: "", nationalId: "" },
  account: { balance: 0, loanBalance: 0, loanPurpose: "" },
  error: "",
  isLoading: false,
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        isLoading: false,
        account: { balance: state.account.balance + action.payload },
      };

    case "account/withdraw":
      if (action.payload > state.account.balance) return state;
      return {
        ...state,
        isLoading: false,
        account: { balance: state.account.balance - action.payload },
      };

    case "account/requestLoan":
      if (
        state.account.loanBalance ||
        action.payload.balance > state.account.balance
      )
        return state;

      return {
        ...state,
        isLoading: false,
        account: {
          balance: state.account.balance + action.payload,
          loanBalance: action.payload.balance,
          loanPurpose: action.payload.purpose,
        },
      };

    case "account/payLoan":
      return {
        ...state,
        isLoading: false,
        account: {
          balance: state.account.balance - state.account.loanBalance,
          loanBalance: 0,
          loanPurpose: "",
        },
      };

    case "customer/create":
      return {
        ...state,
        customer: {
          fullName: action.payload.fullName,
          nationalId: action.payload.nationalId,
        },
      };

    case "loading":
      return { ...state, isLoading: true };

    case "error":
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
}

const store = createStore(accountReducer);

store.dispatch({ type: "loading" });
console.log(store.getState());
store.dispatch({ type: "account/deposit", payload: 5000 });

console.log(store.getState());
store.dispatch({
  type: "customer/create",
  payload: { fullName: "DUSHIMIMANA Fabrice", nationalId: "120028009" },
});
console.log(store.getState());
