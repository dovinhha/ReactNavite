import React,{ useContext } from 'react';
import {  Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

import {styles} from '../styles/styles';
import { IncomeExpense } from './IncomeExpense';
import { GlobalContext } from '../contexts/GlobalState';

export const Balance = () => {

  const { colors } = useTheme();

  const {transactions} = useContext(GlobalContext);
  const amounts = transactions.map(value => value.amount);
  const total = amounts.reduce((sum,amount) => sum+=amount,0);
  const sign = total < 0 ? '-' : '';

  return (
    <View>
      <Text style={[styles.balance,{color : colors.text}]}>Your Balance</Text>
      <Text style={[styles.money,{color : colors.text}]}>{sign}${Math.abs(total).toFixed(2)}</Text>
      <IncomeExpense/>
    </View>
  )
}
