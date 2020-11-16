import React from 'react';
import { AsyncStorage } from 'react-native';

import ProfileReducer from './ProfileReducer';
import * as types from '../constants/actionTypes';

const initialProfileState = {
  name : null,
  date : null,
  gender : null
}

export const ProfileContext = React.createContext(initialProfileState);

export const GlobalProfileProvider = ({children}) => {
  const [profileState,dispatch] = React.useReducer(ProfileReducer,initialProfileState);

  async function editProfileUser(dataProfile){
    await AsyncStorage.setItem('user',JSON.stringify({...dataProfile}));
    dispatch({
      type : types.EDIT_PROFILE_USER,
      payload : {...dataProfile}
    })
  }

  async function retrieveProfile() {
    const data = JSON.parse(await AsyncStorage.getItem('user'));
    const user = data !== null ? {...data} : profileState;
    dispatch({
      type : types.RETRIEVE_PROFILE,
      payload : user
    })
  }

  return (
    <ProfileContext.Provider value={{
      profileState : profileState,
      editProfileUser,
      retrieveProfile
    }}>
      {children}
    </ProfileContext.Provider>
  )
}