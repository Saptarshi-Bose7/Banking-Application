import { takeEvery,call, put } from "redux-saga/effects";
import { POSTDATA, SET_POST_DATA } from "../Actions/constant";
import { ArticleAction, IArticle } from "../Reducers/Reducer";
// import axios, { AxiosResponse } from "axios";

type ResponseType = {
    data: any,
  }
  export const postMethod=async (data:IArticle) => 
  {
      try
      {
          const res=await fetch("http://localhost:3500/details",{
            method:"POST",
            headers: {
                        "Content-type": "application/json; charset=UTF-8",
                      },
            body:JSON.stringify({
                ...data,
               
            })
          })
          return res.ok
      }
      catch(e)
      {
        throw e
      }
  }
function* PostSaga():Generator<any,void,any>
{
    yield takeEvery(POSTDATA,PostData)
}

// const postDetails = (data:any) => axios.post('http://localhost:3500/details',data);

function* PostData(action:ArticleAction):Generator<any,void,any>
{
    try
    {
    console.log(action.data)
    const response = yield call(postMethod,action.data)
    // yield put({type:SET_POST_DATA,data:action.data})
    }
    catch(e)
    {
        console.log(e)
        throw e
    }
}

// const PostWatchers:(() => Generator<any,void,any>)[]=[PostSaga]

export default PostSaga