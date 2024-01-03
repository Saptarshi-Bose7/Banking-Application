import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { SideNav } from './Components/SideNav';
import {BrowserRouter as Router,MemoryRouter,Route} from 'react-router-dom'
import { createMemoryHistory } from 'history';
import store from './Store/Store';

const mockStore = configureMockStore();

test('Side Nav Tests 1', () => {
  const store = mockStore({
    Data: [],
    balance: 1000,
    accountType: 'Savings',
  });

  render(
    <Provider store={store}>
      <Router>
        <SideNav isActive={true} />
      </Router>
    </Provider>
  );

  const text = screen.getByRole('heading', {
    level: 2,
    name: 'Saptarshi Bose',
  });

  expect(text).toBeInTheDocument();
});

test('Side Nav Tests 2', () => {
    const store = mockStore({
      Data: [],
      balance: 1000,
      accountType: 'Savings',
    });
  
    render(
      <Provider store={store}>
        <Router>
          <SideNav isActive={true} />
        </Router>
      </Provider>
    );
  
    const text = screen.getByRole('heading', {
      level: 4,
      name: 'Balance',
    });
  
    expect(text).toBeInTheDocument();
  });

  test('credit button triggers onClick function', () => {
    render(<Provider store={store}><Router><SideNav isActive={true} /></Router></Provider>);
  
    const button =  screen.getByRole('button', { name: /Credit/i });
    fireEvent.click(button);
  
    // Here you would have some expectation statement that verifies 
    // that your navigation callback function has been invoked.
    // Depending on your actual navigation logic, the specifics here will vary.
  });
  
  test('debit button triggers onClick function', () => {
    render(<Provider store={store}><Router><SideNav isActive={true} /></Router></Provider>);
  
    const button =  screen.getByRole('button', { name: /Debit/i });
    fireEvent.click(button);
  
    // Here you would have some expectation statement that verifies 
    // that your navigation callback function has been invoked.
    // Depending on your actual navigation logic, the specifics here will vary.
  });
