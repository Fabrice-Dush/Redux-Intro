const initialState = {
  fullName: "",
  nationalId: "",
  error: "",
  isLoading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "customer/create":
      return {
        ...state,
        isLoading: false,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
      };

    case "loading":
      return { ...state, isLoading: true };

    case "error":
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
}

//? reducers
export function createCustomer(fullName, nationalId) {
  return { type: "customer/create", payload: { fullName, nationalId } };
}
