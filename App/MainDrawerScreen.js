import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MainTabScreen from './MainTabScreen';
import {DrawerContent} from './DrawerContent';
import { 
  Profile
} from './Screens';
import { GolbalProvider } from '../contexts/GlobalState';
import {GlobalProfileProvider} from '../contexts/GlobalProfileState';

const Drawer = createDrawerNavigator();
const ProfileStack = createStackNavigator();

const ProfileStackScreen = ({navigation}) => {
  return (
    <ProfileStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#C37D92',
      },
      headerTitleStyle: {
      fontWeight: '700'
      }
  }}>
      <ProfileStack.Screen name="Profile" component={Profile} options={{
        headerLeft: () => (
            <Icon.Button name="menu" 
              size={25} 
              backgroundColor="#C37D92" 
              onPress={() => navigation.openDrawer()}>              
            </Icon.Button>
        )
      }}/>
    </ProfileStack.Navigator>
  )
}

export default function MainDrawerScreen(){
  return(
    <GolbalProvider>
      <GlobalProfileProvider>
        <Drawer.Navigator 
          drawerContent={ props => <DrawerContent {...props}/>}
          drawerType={"slide"}
          drawerContentOptions={{
            activeTintColor: '#e91e63',
          }}
        >
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          <Drawer.Screen name="Profile" component={ProfileStackScreen}/>
        </Drawer.Navigator>
      </GlobalProfileProvider>
    </GolbalProvider>
  )
}
