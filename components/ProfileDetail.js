import React from 'react';
import { 
  View, 
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default ProfileDetail = ({profile,gender}) => {
  const name = profile.label === 'Name' ? (gender ==='male' ? 'human-male' : 'human-female') : 'cake-variant';
  const color = profile.label === 'Name' ? (gender ==='male' ? '#820263' : '#820263') : '#DE1A1A';
  return (
    <View style={{flexDirection : 'row',height : 50,alignItems : "center",marginBottom:20}}>
      <Text style={{flex:2,fontSize : 18,fontWeight : '600'}}>
        {profile.label}
      </Text>
      <Text style={{flex :7,fontSize : 18,fontWeight : '500'}}>
        {profile.value}
      </Text>
      <View style={{flex : 1}}>
        <Icon name={name} color={color} size={26}/>
      </View>
    </View>
  )
}
