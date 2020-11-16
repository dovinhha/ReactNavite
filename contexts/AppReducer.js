import * as types from '../constants/actionTypes';

export default ( state,action ) => {
  switch ( action.type ) {
    case types.ADD_TRANSACTION :
      return {
        ...state,
        transactions : action.payload
      };
    case types.DELETE_TRANSACTION : 
      return {
        ...state,
        transactions : action.payload
      };
    case types.RETRIEVE_TRANSACTION :
      return {
        ...state,
        transactions : action.payload
      }
    default : 
      return {
        ...state,
        transactions : []
      };
  }
}