import React from 'react';
import { applyMiddleware, combineReducers, createStore ,Middleware,Store} from 'redux';
import { ArticleAction, ArticleState } from '../Reducers/Reducer';
import createSagaMiddleware from "redux-saga"
import Reducer from '../Reducers/Reducer';
import { configureStore, ReducerType } from '@reduxjs/toolkit';
import ProductSaga from '../Saga/ProductSaga';
import PostSaga from '../Saga/PostSaga';
// import { rootSaga } from '../index';
import { all } from 'redux-saga/effects';

export function* rootSaga() {
    yield all([
      ProductSaga(),
      PostSaga()
    ]);
  }
const middleWare = createSagaMiddleware()

const store = configureStore({
    reducer:Reducer,
    middleware:(getDefaultMiddleWare) => 
    
        getDefaultMiddleWare().concat(middleWare as unknown as Middleware)
    
})

// middleWare.run(ProductSaga)
// middleWare.run(PostSaga)

middleWare.run(rootSaga)


export default store;