import axios, { Axios } from "axios";
import { ArticleAction, IArticle } from "../Reducers/Reducer";
import { CREDIT, DEBIT, FETCH, POSTDATA } from "./constant";
import { Dispatch } from "redux";

export const ProductList = () =>
{
    return {
        type:FETCH
    }
}

export const SEND = (data:number) =>
{
    return{
        type:DEBIT,
        payload:data,
    }

}

export const RECEIVE = (data:number) =>
{
    return {
        type:CREDIT,
        payload:data,
    }
}

export const POST = (data:IArticle) =>
{
    return {
        type:POSTDATA,
        data
    }
}