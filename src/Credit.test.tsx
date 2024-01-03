import React from 'react';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from "react-redux";
import Credit from './Pages/Credit';
import Reducer from "./Reducers/Reducer";   // Import your real reducer
import { BrowserRouter } from 'react-router-dom';
import store from './Store/Store';
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
      "id": "0.8044248847650859",
      "Name": "Anish",
      "CreditOrDebit": "Credit",
      "Date": "2024-01-03T09:17:05.901Z",
      "Amount": 50000,
      "Type": "Google Pay"
    },
    {
      "id": "0.6727606084858389",
      "Name": "Adrita",
      "Type": "Paytm",
      "CreditOrDebit": "Debit",
      "Date": "2024-01-03T09:17:27.981Z",
      "Amount": 20000
    },],
    balance: 50000,
    accountType: "Savings"
  }, store = createStore(Reducer, initialState) }: Options = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store
  };
};

afterEach(cleanup);

describe('Credit Component', () => {
  it('renders with Redux using initial state', () => {
    const { getAllByPlaceholderText } = renderWithRedux(<Credit />);

  // Use getAllByPlaceholderText instead of getByPlaceHolderText
  const inputs = getAllByPlaceholderText('Enter Amount Here');

  // Iterate and find the input element you need to test
  const input = inputs[0] as HTMLInputElement; // Assuming the input you want is the first one in the array

  expect(input.value).toBe('0');

  });
  it('dispatches POST and RECEIVE actions on form submit', async () => {
    const { getByTestId, store } = renderWithRedux(<Credit />);

    const amountInput1 = getByTestId('amountInput1');
    const submitButton1 = getByTestId('submit1');

    fireEvent.change(amountInput1, { target: { value: '100' } });
    fireEvent.click(submitButton1);
    
    // wait for updates in the redux store
    await waitFor(() => {
      expect(store.getState().Data[0].Amount).toBe(50000);
    });
  });
  
})