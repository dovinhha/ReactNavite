import React from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native-animatable';
import { 
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme, 
  DarkTheme as NavigationDarkTheme
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { 
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultDarkTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';

import MainDrawerScreen from './App/MainDrawerScreen';
import MainAuthScreen from './App/MainAuthScreen';
import { AuthContext } from './contexts/GlobalAuthState';
import { GlobalAuthProvider } from './contexts/GlobalAuthState';

const RootStack = createStackNavigator();

const RootStackScreen = () => {
  const { retrieveToken,loginState,isDarkTheme } = React.useContext(AuthContext);


  React.useEffect(() => {
    setTimeout(()=>{
      retrieveToken();
    },1000);
  }, [])

  if(loginState.isLoading){
    return (
      <View style={{flex :1,justifyContent:"center",alignItems : "center",backgroundColor:"#F5D6BA"}}>
        <ActivityIndicator size='large' color="orange"/>
      </View>
    )
  }

  const customDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultDarkTheme,
    colors : {
      ...PaperDefaultDarkTheme.colors,
      ...PaperDefaultDarkTheme.colors,
      text : '#000',
      background : '#fff',
      bordercolor : '#000'
    }
  }
  const customDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors : {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      text : '#fff',
      background : '#000',
      bordercolor : '#999'
    }
  }

  const theme = isDarkTheme ? customDarkTheme : customDefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <RootStack.Navigator headerMode="none">
          {loginState.userToken ? (
              <RootStack.Screen name="Auth" component={MainDrawerScreen}/>

            ):(
              <RootStack.Screen name="App" component={MainAuthScreen}/>
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

export default function App() {
  return (
    <GlobalAuthProvider>
      <RootStackScreen/>
    </GlobalAuthProvider>
  );
}