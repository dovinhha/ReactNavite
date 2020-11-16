import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { GlobalContext } from '../contexts/GlobalState';
import { styles } from '../styles/styles';

export const IncomeExpense = () => {

  const { colors } = useTheme();

  const {transactions} = useContext(GlobalContext);
  const amounts = transactions.map(val => val.amount);
  const income = amounts.filter(val => val > 0).reduce((sum,amount) => sum+=amount,0).toFixed(2);
  const expense = (amounts.filter(val => val < 0).reduce((sum,amount) => sum+=amount,0)*-1).toFixed(2);

  return (
    <View style={[
      styles.incomeExpense,
      colors.background === '#000' ? {backgroundColor : '#333'} : {backgroundColor : '#f1f1f1'}
    ]}>
      <View>
        <Text style={[styles.textTransform,{color : colors.text}]}>income</Text>
        <Text style={[styles.income]}>{income}</Text>
      </View>
      <View>
        <Text style={[styles.textTransform,{color : colors.text}]}>expense</Text>
        <Text style={[styles.expense]}>{expense}</Text>
      </View>
    </View>
  )
}
