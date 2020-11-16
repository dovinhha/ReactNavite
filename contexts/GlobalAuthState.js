import React from 'react';
import * as types from '../constants/actionTypes';
import loginReducer from './loginReducer';
import { Alert, AsyncStorage } from 'react-native';

const initialLoginState = {
  isLoading : true,
  userToken : null
}

export const AuthContext = React.createContext(initialLoginState);
 
export const GlobalAuthProvider = ({children}) => {
  const [loginState,dispatch] = React.useReducer(loginReducer,initialLoginState);
  const [isDarkTheme,setIsDarkTheme] = React.useState(false);

  async function signIn(userName,password){
    let userToken = null;
    if( userName==='DoVinhHa' && password==='vinhha'){
      userToken = 'abc';
      try {
        await AsyncStorage.setItem('userToken',userToken);
      }
      catch(e) {
      }
    }
    else {
      Alert.alert('Import','Email : DoVinHa - Password : vinhha')
    }
    dispatch({
      type : types.LOG_IN, 
      token : userToken
    });
  };
  async function signOut(){
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('transactions');
      await AsyncStorage.removeItem('user');
    }
    catch(e) {
    }
    dispatch({
      type : types.LOG_OUT
    });
  };
  async function signUp(userName,password){
    let userToken = null;
    if( userName==='DoVinhHa' && password==='vinhha'){
      userToken = 'abc';
      try {
        await AsyncStorage.setItem('userToken',userToken);
      }
      catch(e) {
      }
    }
    else {
      Alert.alert('Import','Email : DoVinHa - Password : vinhha')
    }
    dispatch({
      type : types.LOG_UP, 
      token : userToken
    });
  };
  async function retrieveToken(){
    let userToken;
    let theme;
    try {
      userToken = await AsyncStorage.getItem('userToken');
      theme = JSON.parse(await AsyncStorage.getItem('theme'));
    }
    catch(e) {
    }
    setIsDarkTheme(theme);
    dispatch({
      type : types.RETRIEVE_TOKEN, 
      token : userToken
    });
  }

  async function toggleTheme(){
    try {
      await AsyncStorage.setItem('theme',JSON.stringify(!isDarkTheme));
    }
    catch(e) {
    }
    setIsDarkTheme(!isDarkTheme);
  }
 

  return (
    <AuthContext.Provider value={{
        loginState : loginState,
        isDarkTheme : isDarkTheme,
        signIn,
        signOut,
        signUp,
        retrieveToken,
        toggleTheme
    }}>
      {children}
    </AuthContext.Provider>
  )
}
