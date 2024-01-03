import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import { Provider, useSelector } from 'react-redux';
import store from './Store/Store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SendRounded } from '@mui/icons-material';
import  Credit  from './Pages/Credit';
import Debit from './Pages/Debit';

function App() {
  
  return (
    <div className="App">
      <Provider store={store} >
      Home
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/credit" element={<Credit />} />
            <Route path="/debit" element={<Debit />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
