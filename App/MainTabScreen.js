import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { 
  ExpenseTracker,
  Home,
  Settings,
  ProfileSetting
} from './Screens';

const HomeStack= createStackNavigator();
const ExpenseTrackerStack = createStackNavigator();
const SettingStack = createStackNavigator();
const ProfileSettingStack = createStackNavigator();

const Tabs = createMaterialBottomTabNavigator();

const HomeStackScreen = ({navigation}) => {
  return (
    <HomeStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTitleStyle: {
      fontWeight: '700'
      }
  }}>
      <HomeStack.Screen name="Home" component={Home} options={{
        headerLeft: () => (
            <Icon.Button name="menu" 
              size={25} 
              backgroundColor="#009387" 
              onPress={() => navigation.openDrawer()}>              
            </Icon.Button>
        )
        }}/>
    </HomeStack.Navigator>
  )
}

const ExpenseTrackerStackScreen = ({navigation}) => {
  return ( 
    <ExpenseTrackerStack.Navigator screenOptions={{
      headerStyle : {
        backgroundColor : "#C490D1"
      },
      headerTitleStyle : {
        fontWeight : "700"
      }
    }}>
      <ExpenseTrackerStack.Screen name="Expense Tracker" component={ExpenseTracker} options={{
        headerLeft: () => (
            <Icon.Button name="menu" 
              size={25} 
              backgroundColor="#C490D1" 
              onPress={() => navigation.openDrawer()}>              
            </Icon.Button>
        )
        }}/>
    </ExpenseTrackerStack.Navigator>
  )
}

const ProfileSettingScreen = ({navigation}) => {
  return (
    <ProfileSettingStack.Navigator>
      <ProfileSettingStack.Screen
        name='ProfileSetting' 
        component={ProfileSetting}/>
    </ProfileSettingStack.Navigator>
  )
}

const SettingStackScreen = ({navigation}) => {
  return (
    <SettingStack.Navigator screenOptions={{
      headerStyle : {
        backgroundColor : "#7D8CC4"
      },
      headerTitleStyle : {
        fontWeight : "700"
      }
    }}>
        <SettingStack.Screen name="Setting" component={Settings} options={{
          headerLeft: () => (
              <Icon.Button name="menu" 
                size={25} 
                backgroundColor="#7D8CC4" 
                onPress={() => navigation.openDrawer()}>              
              </Icon.Button>
          )
        }}/>
      <SettingStack.Screen name='ProfileSetting' component={ProfileSettingScreen} options={{title : "Profile Setting"}}/>
    </SettingStack.Navigator>
  )
}

export default function MainTabScreen(){
  return (         
    <Tabs.Navigator 
      initialRouteName="HomeTab"
      activeColor="#fff"
      shifting = {true}
    >
      <Tabs.Screen name="Home" 
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="home-outline" size={25} color={color} />
          )
        }}
      />
      <Tabs.Screen name="ExpenseTracker" 
        component={ExpenseTrackerStackScreen}
        options={{
          tabBarLabel: 'Expense Tracker',
          tabBarColor: '#C490D1',
          tabBarIcon: ({ color }) => (
            <Icon name="file-document-edit-outline" size={23} color={color} />
          )
        }}/>
      <Tabs.Screen name="Settings" 
        component={SettingStackScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarColor: '#7D8CC4',
          tabBarIcon: ({ color }) => (
            <Icon name="settings-outline" size={23} color={color} />
          )
        }}/>
    </Tabs.Navigator>
  )
}