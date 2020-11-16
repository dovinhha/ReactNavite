import React, { useContext, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';

import { GlobalContext } from '../contexts/GlobalState';
import {styles} from '../styles/styles';

export const Transaction = ({transaction}) => {

  const { colors } = useTheme();
  const [displayImg,setDisplayImg] = useState(true);
  const sign = transaction.amount < 0 ? '-' : '+';
  const { deleteTransaction } = useContext(GlobalContext)

  return (
    <View style={{flexDirection:'row'}}>
      <View style={[
        styles.history,
        transaction.amount >=0 ? {borderRightColor : 'green'} : {borderRightColor : 'red'},
        colors.background === '#000' ? {backgroundColor : '#333'} : {backgroundColor : '#f1f1f1'}]}>
        <View style={{flex:1,paddingRight : 20,paddingLeft : 20,}}>
          <TouchableOpacity onPress={() => {setDisplayImg(!displayImg)}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={{color : colors.text}}>
                {transaction.text}
              </Text>
              <Text style={{color : colors.text}}>
                {sign}${Math.abs(transaction.amount)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={displayImg?{display:'none'}:{flex:1,justifyContent:'center',alignItems:'center',height:40}}>
        <TouchableOpacity onPress={() => deleteTransaction(transaction.id)}>
           <Icon name="delete-outline" size={26} color='#6F2DBD'/>  
        </TouchableOpacity>
      </View>
    </View>
  )
}
