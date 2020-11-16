import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { GlobalContext } from '../contexts/GlobalState';
import {styles} from '../styles/styles';
import { Transaction } from './Transaction';

export const TransactionList = () => {

  const { colors } = useTheme();
  const { transactions } = useContext( GlobalContext );

  return (
    <>
      <View style={styles.borderBottom}>
          <Text style={[styles.title,{color : colors.text}]}>
            History
          </Text>
      </View>
      <View style={transactions.length !== 0 ? styles.historyContainer : {height : 0}} >
        <ScrollView>
          {transactions.map((transaction) => <Transaction key={transaction.id} transaction={transaction}/>)}
        </ScrollView>
      </View>
    </>
  )
}
