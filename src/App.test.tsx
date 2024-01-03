import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { SideNav } from './Components/SideNav';
import { createMemoryHistory } from 'history';
import Home from './Pages/Home';
import Credit from './Pages/Credit';
import Debit from './Pages/Debit';
import { Provider } from 'react-redux';
import store from './Store/Store';

// type props={
//   isActive:boolean
// }

test('renders learn react link', () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});

describe('App component', () => {
  it('Renders component', async() => {
    // Wrap components in BrowserRouter and Redux provider
    render(<MemoryRouter initialEntries={['/']}> <Routes><Route element={<Home />} /></Routes></MemoryRouter>);
    // Write your assertions here.
    // For example, you could test if the component renders without errors
    // Or if "Home" link is present in the component
    const linkElement = await screen.findByText('');


    expect(linkElement).toBeInTheDocument();
  });

  it('Renders Credit route', () => {
    // Test if navigating to "/credit" route renders Credit component
    render(<MemoryRouter initialEntries={['/credit']}><Routes><Route element={<Credit />} /></Routes></MemoryRouter>);
    const history = createMemoryHistory();
    history.push('/credit');
    const creditElement = screen.getByText('');
    expect(creditElement).toBeInTheDocument();
  });
});