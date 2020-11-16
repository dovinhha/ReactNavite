import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import {
  SignIn,
  CreateAccount,
  Splash
} from './Screens';

const AuthStack = createStackNavigator();

export default function MainAuthScreen(){
  return (
    <AuthStack.Navigator headerMode='none'>
      <AuthStack.Screen name='Splash' component={Splash} />
      <AuthStack.Screen name="SignIn" component={SignIn}/>
      <AuthStack.Screen name="CreateAccount" component={CreateAccount}/>
    </AuthStack.Navigator>
  )
}
