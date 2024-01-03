import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Pages/Home';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { SideNav } from './Components/SideNav';
import store from './Store/Store';
import { BrowserRouter } from 'react-router-dom';

// const mockStore = configureMockStore([thunk]);

// describe('Home component', () => {
//   let store: any;

//   beforeEach(() => {
//     store = mockStore({
//       Data: [{ Amount: 100, Name: 'Test', Date: '01/01/2022', CreditOrDebit: 'Credit' }],
//     });
//   });

  test('should render a table with correct data', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
            <Home />
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Credit/Debit')).toBeInTheDocument();
   
  });

  test('should toggle active class on menu button click', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>,
    );
    const toggleMenu = container.querySelector('.toggleMenu');
    toggleMenu?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    expect(container.querySelector('.side-nav')?.classList).toContain('active');
    toggleMenu?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    expect(container.querySelector('.side-nav')?.classList).not.toContain('active');
  });



