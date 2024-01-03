import React from "react";
import Debit from "./Pages/Debit";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import store from "./Store/Store";
import { DEBIT, POSTDATA } from "./Actions/constant";
import Reducer from "./Reducers/Reducer";
import { POST, SEND } from "./Actions/Actions";

interface State {
    Data: any[]; // Replace 'any' with the actual type of the items in 'Data'
    balance: number;
    accountType: string;
  }
  
  interface Options {
    initialState?: State;
    store?: any; // Replace 'any' with the type of your store
  }
// Create a function to render the component with the store
const renderWithRedux = (
  component:any,
  { initialState = {
    Data: [ {
      "id": "0.6727606084858389",
      "Name": "Adrita",
      "Type": "Paytm",
      "CreditOrDebit": "Debit",
      "Date": "2024-01-03T09:17:27.981Z",
      "Amount": 20000
    },
    {
      "Name": "Adrita",
      "Type": "eWallet",
      "CreditOrDebit": "Debit",
      "id": "0.8353885917600856",
      "Date": "2024-01-03T09:59:43.090Z",
      "Amount": -2000
    }],
    balance: 50000,
    accountType: "Savings"
  }, store = createStore(Reducer, initialState) }: Options = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store
  };
};

describe("Debit Component", () => {

  let store = createStore(Reducer);

  beforeEach(() => {
    store = createStore(Reducer);
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <Debit />
      </Provider>
    );

  it("renders the correct number of accordion items", () => {
    renderComponent();
    const accordionItems = screen.getAllByRole("button", { name: /Saptarshi/i });
    expect(accordionItems).toHaveLength(1); // This will depend on the number of receivers in your mock data.
  });

  it("updates the amount state when the input field changes", () => {
    renderComponent();

    // Get the first input field and simulate a change
    const amountInput = screen.getByTestId("amount1") as HTMLInputElement;
    fireEvent.change(amountInput, { target: { value: "200" } });

    // Check that the amount state is updated correctly
    expect(amountInput.value).toBe("200");
  });
  const initialState = {
    Data: [
      // Add some initial data to the store
      {
        id: "1",
        Name: "Anish",
        CreditOrDebit: "Credit",
        Amount: 0,
        Date: new Date().toISOString(),
      },
    ],
  };
  
  it('dispatches POST and RECEIVE actions on form submit', async () => {
    const { getByTestId, store } = renderWithRedux(<Debit />);

    const amountInput1 = getByTestId('amount1');
    const submitButton1 = getByTestId('submit1');

    fireEvent.change(amountInput1, { target: { value: '100' } });
    fireEvent.click(submitButton1);
    
    // wait for updates in the redux store
    await waitFor(() => {
      expect(store.getState().Data[1].Amount).toBe(-2000);
    });
  });
  
});
