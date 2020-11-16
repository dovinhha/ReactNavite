import React, { useContext, useState} from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { GlobalContext } from '../contexts/GlobalState';
import {styles} from '../styles/styles';

export const  AddTransaction = () => {

  const { colors } = useTheme();

  const [ text,setText ] = useState(''); 
  const [ amount,setAmount] = useState('');
  const { addTransaction } = useContext(GlobalContext);
 
  const onSubmit = (e) => {
      e.preventDefault();
      const re=/^\S+$/;
      setText(text.trim().split(' ').filter(val => val !== '').join(' '));
      setAmount(amount.trim());

      if(text === ''||amount===''||!+amount||!re.test(amount)) {
        Alert.alert('Incorrect syntax');
      }
      else{
        const newTransaction = {
          id : Math.floor(Math.random()*1000000),
          text : text,
          amount : +amount
        };
        addTransaction(newTransaction);
      }

      setText('');
      setAmount('');
  }

  return (
      <View>
        <View style={styles.borderBottom}>
          <Text style={[styles.title,{color : colors.text}]}>
            Add new transaction
          </Text>
        </View>
        <Text style={[styles.text,{color : colors.text}]}>
          Text
        </Text>
        <TextInput style={[
          styles.textInput,
          {color : colors.text},
          colors.background === '#000' ? {backgroundColor : "#333"} : {backgroundColor : "#f1f1f1"}
        ]} value={text} 
          onChangeText={ text => setText(text)}  
          placeholder='Enter text'/>
        <Text style={[styles.text,{color : colors.text}]}>
          Amount
        </Text>
        <Text style={{color : colors.text}}>
          (negative-expense,positive-income)
        </Text>
        <TextInput style={[
          styles.textInput,
          {color : colors.text},
          colors.background === '#000' ? {backgroundColor : "#333"} : {backgroundColor : "#f1f1f1"}
        ]} value={amount.toString()} 
          onChangeText={ amount => setAmount(amount)}  
          placeholder='0'/>
        <View style={styles.footer}>
          <Button color='#9c88ff' title='Add transaction' onPress={onSubmit}/>
        </View>
      </View>
  )
}
