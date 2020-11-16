import React,{ createContext,useReducer } from 'react';
import { AsyncStorage } from 'react-native';

import * as types from '../constants/actionTypes';
import AppReducer from './AppReducer';

const initialStateTransaction = {
  transactions : []
}

export const GlobalContext = createContext(initialStateTransaction);

export const GolbalProvider = ({ children }) => {

  const [ state,dispatch ] = useReducer( AppReducer, initialStateTransaction );

  async function addTransaction(transaction) {
    const transactions = [transaction,...state.transactions];
    await AsyncStorage.setItem('transactions',JSON.stringify(transactions));
    dispatch({
      type : types.ADD_TRANSACTION,
      payload : transactions
    })
  }

  async function deleteTransaction(id) {
    const transactions = [...state.transactions.filter( val => val.id !== id)];
    await AsyncStorage.setItem('transactions',JSON.stringify(transactions));
    dispatch({
      type : types.DELETE_TRANSACTION,
      payload : transactions
    })
  }

  async function retrieveTransaction(){
    const data = JSON.parse(await AsyncStorage.getItem('transactions'));
    const transactions = data !== null ? [...data] : [];
    dispatch({
      type : types.RETRIEVE_TRANSACTION,
      payload : transactions
    })
  }

  return (
    <GlobalContext.Provider value={{
      transactions : state.transactions,
      addTransaction,
      deleteTransaction,
      retrieveTransaction
    }}>
      {children}
    </GlobalContext.Provider>
  )
}
