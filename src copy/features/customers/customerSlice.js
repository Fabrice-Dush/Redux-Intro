const initialState = {
  fullName: "",
  nationalId: "",
  error: "",
  isLoading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        isLoading: false,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
      };

    case "customer/updateName":
      return { ...state, fullName: action.payload };

    case "loading":
      return { ...state, isLoading: true };

    case "error":
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
}

//? action creators
export function createCustomer(fullName, nationalId) {
  return { type: "customer/createCustomer", payload: { fullName, nationalId } };
}

export function updateName(newName) {
  return { type: "customer/updateName", payload: newName };
}
