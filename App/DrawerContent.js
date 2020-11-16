import React from 'react';
import {View,Text} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Drawer,
  TouchableRipple,
  Switch,
  useTheme
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthContext } from '../contexts/GlobalAuthState';
import {ProfileContext} from '../contexts/GlobalProfileState';

export const DrawerContent = (props) => {

  const { signOut,toggleTheme } = React.useContext(AuthContext);
  const { profileState } = React.useContext( ProfileContext );

  const paperTheme = useTheme();
  const { colors } = paperTheme;

  return (
    <View style={{flex : 1}}>
      <DrawerContentScrollView {...props}>
        <View style={{flex : 1}}>
          <View style={{paddingLeft : 15,flexDirection:"row",marginTop:10}}>
            <Avatar.Image
              source={require('../assets/abc.jpg')}
              size={50}
            />
            <View style={{marginLeft:10}}>
              <Title style={{fontSize : 16}}>
                {profileState.name}
              </Title>
              <Caption style={{fontSize : 12, marginTop:0}}>
                @202010310833
              </Caption>
            </View>
          </View>
        </View>
        <Drawer.Section>
          <DrawerItem
            label='Home'
            icon={() =>
              <Icon name='home-outline' size={24} color={colors.text}/>
            }
            onPress={()=>{ props.navigation.navigate('Home') }}
          />
          <DrawerItem
            label='Expense Tracker'
            icon={() =>
              <Icon name="file-document-edit-outline" size={24} color={colors.text}/>
            }
            onPress={()=>{ props.navigation.navigate('ExpenseTracker') }}
          />
          <DrawerItem
            label='Setting'
            icon={() =>
              <Icon name='settings-outline' size={24} color={colors.text}/>
            }
            onPress={()=>{ props.navigation.navigate('Settings') }}
          />
          <DrawerItem
            label='Profile'
            icon={() =>
              <Icon name='account-outline' size={24} color={colors.text}/>
            }
            onPress={()=>{ props.navigation.navigate('Profile') }}
          />
        </Drawer.Section>
      <Drawer.Section title='preferences'>
          <TouchableRipple onPress={()=> {toggleTheme()}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',margin:15}}>
              <Text style={{fontSize:16,fontWeight:'500',color : colors.text}}>
                Dark Theme
              </Text>
              <View pointerEvents='none'>
                <Switch value={paperTheme.dark}/>
              </View>
            </View>
          </TouchableRipple>
      </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={{
        borderTopColor : '#999',
        borderTopWidth : 1,
        borderBottomColor : '#999',
        borderBottomWidth : 1,
        marginBottom : 15
        }}
      >
        <DrawerItem
          label='Sign Out'
          icon = {() =>
            <Icon name='exit-to-app' size={26} color={colors.text}/>
          }
          onPress={()=>{ signOut() }}
        />
      </Drawer.Section>
    </View>
  )
}
