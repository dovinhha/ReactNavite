import * as types from '../constants/actionTypes';

export default (state,action) => {
  switch(action.type){
    case types.EDIT_PROFILE_USER :
      return {...action.payload};
    case types.RETRIEVE_PROFILE :
      return {...action.payload}; 
  }
}