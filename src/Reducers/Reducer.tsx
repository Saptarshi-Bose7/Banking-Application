import React, { ReactNodeArray } from 'react';
import { CREDIT, DEBIT, SET_DATA, SET_POST_DATA } from '../Actions/constant';
import { RECEIVE } from '../Actions/Actions';

export interface IArticle{
    id:string,
    Date:string,
    Name:string,
    CreditOrDebit:string,
    Amount:number
}

export type ArticleState={
    Data:IArticle[],
    balance:number,
    accountType: string
}

export type ArticleAction = {
    type:string,
    data:IArticle,
    Data:IArticle,
    payload:number
}
const storedBalance = localStorage.getItem('balance7');
const InitialState:ArticleState={
    Data:[],
    balance:storedBalance ? JSON.parse(storedBalance) : 0,
    accountType:"Savings"
}

// export type DispatchTypes = (args:ArticleAction) => ArticleAction

const Reducer = (state:ArticleState=InitialState,action:ArticleAction) : ArticleState => {

    switch(action.type)
    {
       case SET_DATA:
       console.log(state.Data)
        return {
            ...state,
            Data:state.Data.concat(action.data)
        }
        break;
        // case SET_POST_DATA:
        // return {
        //     ...state,
        //     Data:state.Data.concat(action.data)
        // }
    case CREDIT:
    
        console.log("Hey",action.payload)
        const newCreditBalance = state.balance + action.payload;
        localStorage.setItem('balance7', JSON.stringify(newCreditBalance));
        return {
            ...state,
            balance:newCreditBalance
        }
        
    
    case DEBIT:
        const newDebitBalance = state.balance - action.payload;
        localStorage.setItem('balance7', JSON.stringify(newDebitBalance))
        return {
            ...state,
            balance:newDebitBalance
        }
        
    
    default:
    
        return state
        
    }
   
};

export default Reducer ;