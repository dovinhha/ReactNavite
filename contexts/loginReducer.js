import React from 'react';
import * as types from '../constants/actionTypes'

export default loginReducer = (prevState,action) => {
  switch(action.type){
    case types.LOG_IN :
      return {
        ...prevState,
        userToken : action.token,
        isLoading : false
      } 
    case types.LOG_OUT :
      return {
        ...prevState,
        userToken : null,
        isLoading : false
      } 
    case types.LOG_UP : 
      return {
        ...prevState,
        userToken : action.token,
        isLoading : false
      }
    case types.RETRIEVE_TOKEN :
      return {
        ...prevState,
        isLoading : false,
        userToken : action.token
      } 
  }
}
