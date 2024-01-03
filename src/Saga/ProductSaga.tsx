import { takeEvery,put } from "redux-saga/effects"
import { FETCH, SET_DATA, SET_POST_DATA } from "../Actions/constant"
// import { DispatchTypes } from "../Reducers/Reducer"





export function* getDetails():Generator<any,void,any>
{
    let data=yield fetch("http://localhost:3500/details")
    data = yield data.json()
    console.log(data)
    yield put({type:SET_DATA,data})
    
}

function* ProductSaga():Generator<any,void,any>
{
   yield takeEvery(FETCH,getDetails)
}

// const ProductWatchers:(() => Generator<any,void,any>)[]=[ProductSaga]

export default ProductSaga