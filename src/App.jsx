import CreateCustomer from "./features/customers/CreateCustomer.jsx";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/accounts/AccountOperations.jsx";
import BalanceDisplay from "./features/accounts/BalanceDisplay.jsx";
import { useSelector } from "react-redux";

function App() {
  const customer = useSelector((store) => store.customer);

  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {!customer.fullName?.trim().length ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;
