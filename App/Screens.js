import React from 'react';
import { 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard, 
  View, 
  Text, 
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  StatusBar
} from 'react-native';
import {
  Switch
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import { TextInput } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTheme } from '@react-navigation/native';

import { GlobalContext } from '../contexts/GlobalState';
import { AddTransaction } from '../components/AddTransaction';
import { TransactionList } from '../components/TransactionList';
import { Balance } from '../components/Balance';
import { styles } from '../styles/styles';
import { AuthContext } from '../contexts/GlobalAuthState';
import { ProfileContext } from '../contexts/GlobalProfileState';


export const ExpenseTracker = () => {
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "position" : "height"}>
        <View>
          <Balance/>
          <TransactionList/>
          <AddTransaction/>
        </View>
      </KeyboardAvoidingView> 
    </ScrollView>
  )
}

export const Home = () => {
  const {transactions,retrieveTransaction} = React.useContext(GlobalContext);
  const { profileState,retrieveProfile } = React.useContext( ProfileContext );

  const { colors } = useTheme();
  const theme = useTheme();

  React.useEffect(()=>{
    retrieveTransaction();
    retrieveProfile();
  },[]);
  const name =profileState.name;
  const amounts = transactions.map((val)=>val.amount);
  const total = amounts.reduce((sum,amount)=>sum += amount,0);
  const sign = total < 0 ? '-' : '';

  return (
    <View style={styles.styleHomeScreenContainer}> 
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'}/>
      <Animatable.View animation='bounceInDown'>
        <Text style={[styles.styleHomeScreenTextHeader,{color : colors.text}]}>
          Goodmoring {name}
        </Text>
        <Text style={[styles.styleHomeScreenTextBalance,{color : colors.text}]}>
          Your Balance
        </Text>
        <Text style={[styles.balance,{color : colors.text}]}>
          {sign}${Math.abs(total).toFixed(2)}
        </Text>
      </Animatable.View>
      <View style={styles.viewImage}>
        <Animatable.Image animation='tada' style={[styles.image,{borderColor : colors.bordercolor}]} source={require('../assets/abc.jpg')}/>
      </View>
    </View>
  )
}

export const Settings = ({navigation}) => {

  const { signOut,isDarkTheme,toggleTheme } = React.useContext(AuthContext);
  const { colors } = useTheme();
  
  return (
    <View style={{flex :1}}>
      <View style={{flex : 1}}>
        <Animatable.View 
          animation='bounceInLeft'
          style={{
            marginTop : 20,
            marginBottom : 20
            }}
        >
          <TouchableOpacity onPress={()=> navigation.navigate('ProfileSetting')}>
            <View 
              style={[{
                flexDirection : 'row',
                alignItems : 'center',
                height : 60,
                padding : 10,
                },
                colors.background === '#000' ? {backgroundColor : '#333'} : {backgroundColor : '#f1f1f1'}
              ]}
            >
              <Icon style={{flex : 1}} name='account-outline' size={28} color={colors.text}/>  
              <View style={{flex : 9,borderColor : '#d1d1d1',borderBottomWidth: 1,paddingTop : 5,paddingBottom:5 }}>
                <Text style={{fontSize : 16,fontWeight : '500',color : colors.text}}>
                  Profile
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>toggleTheme()}>
            <View 
              style={[
                {
                  height : 60,
                  padding : 10,
                  alignItems : "center", 
                },
                colors.background === '#000' ? {backgroundColor : '#333'} : {backgroundColor : '#f1f1f1'}
              ]}
            >
              <View 
                style={{
                  flexDirection:'row',
                  flex : 1,
                  alignItems :'center'
                }}
              >
                <Icon style={{flex : 1}} name='moon-waning-crescent' size={28} color={colors.text}/>  
                <View style={{flex : 7,borderColor : '#d1d1d1',borderBottomWidth: 1,paddingTop : 5,paddingBottom:5 }}>
                <Text style={{fontSize : 16,fontWeight : '500',color : colors.text}}>
                  Dark Theme
                </Text>
              </View>
                <View style={{flex : 2,alignItems :'center'}} pointerEvents='none'>
                  <Switch value={isDarkTheme}/>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Animatable.View>
      </View>
      <Animatable.View animation='bounceInRight' style={{marginBottom :20}}>
        <TouchableOpacity onPress={() => {signOut()}}>
          <View 
            style={[{
              flexDirection : 'row',
              height : 60,
              alignItems : 'center',
              justifyContent:"center"
            },
            colors.background === '#000' ? {backgroundColor : '#333'} : {backgroundColor : '#f1f1f1'}
          ]}
          >
            <Icon name='exit-to-app' size={28} color={colors.text}/>
            <Text 
              style={{
                fontSize : 16,
                fontWeight : '500',
                opacity : .6,
                color : colors.text }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  )
}

export const ProfileSetting = ({navigation}) => {

  const { profileState,editProfileUser } = React.useContext( ProfileContext );

  const darkTheme = useTheme();
  const { colors } = useTheme();
  const [isName,setIsName] = React.useState(profileState.name);
  const [isDate,setIsDate] = React.useState({
    date : profileState.date ? (new Date( profileState.date )) : (null),
    open : false
  });
  const [isGender, setIsGender] = React.useState(profileState.gender);
  const [isActiveInputName,setIsActiveInputName] = React.useState(false);

  const colorIconName = darkTheme.dark ? (isActiveInputName ? '#fff' : '#999') : (isActiveInputName ? '#000' : '#999');
  const value = isDate.date ? isDate.date.toLocaleString().slice(isDate.date.toLocaleString().indexOf(',')+2) : 'Select date';
  const date = isDate.date ? isDate.date : new Date();

  const onSubmit = (name,date,gender) => {
    const dataProfile = {
      name,
      date,
      gender
    };
    setIsActiveInputName(false);
    editProfileUser(dataProfile);
    Alert.alert('Successful')
    navigation.goBack();
    navigation.navigate('Home');
  }

  return (  
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={{flex :1,padding : 10}}>
      <View style={[{alignItems : "center",marginTop : 85, borderTopWidth : 2,borderColor : '#d1d1d1'}]}>
        <Animatable.Image 
          animation='bounceInDown'
          duration={1500}
          style={{
            width : 150,
            height : 150,
            borderColor : colors.bordercolor,
            borderWidth : 5,
            borderRadius : 150,
            position : "absolute",
            top : -75
          }} 
          source={require('../assets/abc.jpg')}
        />
      </View>
      <Animatable.View animation='bounceInUp' 
        style={[
          {marginTop : 85,padding : 10,flex :1}
        ]}>
        <View>
          <View style={{flexDirection : 'row',height : 65,alignItems : "center",marginBottom:20}}>
            <Text style={{flex:2,fontSize : 18,fontWeight : '600',color :colors.text}}>
              Name
            </Text>
            <View style={{flex : 7}}>
              <TextInput 
                style={
                  darkTheme.dark ?[
                  {borderWidth : 1,padding : 12,borderRadius : 4,color : colors.text,borderColor : '#aaa'},
                  isActiveInputName ? {borderColor : '#fff',backgroundColor : '#333'} : {backgroundColor : '#333'}
                ]:[
                  {borderWidth : 1,padding : 12,borderRadius : 4,color : colors.text,borderColor : '#aaa'},
                  isActiveInputName ? {borderColor : '#000',backgroundColor : '#fff'} : {backgroundColor : '#f1f1f1'}
                ]}
                onChangeText={(text)=>{setIsName(text)}} 
                value={isName}
                editable={isActiveInputName}
              />
            </View>
            <View style={{flex : 1,alignItems :"center"}}>
              <Icon onPress={() => setIsActiveInputName(!isActiveInputName)}  name='square-edit-outline' size={26} color={colorIconName}/>
            </View>
          </View>
          <View style={{flexDirection : 'row',height : 65,alignItems : "center",marginBottom:20}}>
            <View style={{flex : 2}}>
              <Text style={{fontSize : 18,fontWeight : '600',color : colors.text}}>
                Date
              </Text>
            </View>
            <View style={{flex : 7}}>
              <View style={[
                {borderWidth : 1,padding : 12,borderRadius : 4,borderColor : '#aaa'},
                colors.background === '#000' ? {backgroundColor : '#333'} : {backgroundColor : '#f1f1f1'}
              ]}>
                <Text style={{color : colors.text}}>{value}</Text>
              </View>
              <DateTimePickerModal
                date={date}
                mode="date"
                pickerContainerStyleIOS={[
                  {color : colors.text},
                  colors.background === '#000' ? {backgroundColor : '#333'} : {backgroundColor : '#f1f1f1'}]}
                isDarkModeEnabled={darkTheme.dark}
                isVisible={isDate.open}
                onConfirm={(date)=> {setIsDate({
                  date : date,
                  open : false
                })}}
                onCancel={() => {
                  setIsDate({
                    ...isDate,
                    open : false
                  })
                }}
              />
            </View>
            <View style={{flex : 1,alignItems :"center"}}>
              <Icon 
                onPress={()=>{
                  setIsDate({
                    ...isDate,
                    open : !isDate.open
                  })
                }}  
                name='calendar-month' size={28} color='#999'/>
            </View>
          </View>
          <View style={{flexDirection : 'row',height : 65,alignItems : "center",marginBottom:20}}>
            <Text style={{flex:2,fontSize : 18,fontWeight : '600',color : colors.text}}>
              Gender
            </Text>
            <View style={{flex :8,overflow : "hidden"}}>
              <RNPickerSelect
                placeholder={{label : 'Select an gender',value : null,color: '#9EA0A4'}}
                onValueChange={(value) => setIsGender(value)}
                items={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' }
                ]}
                style={
                  darkTheme.dark ? {...pickerSelectStyles2,
                  iconContainer: {
                  top: 10,
                  right: 12,
                  }
                }:{...pickerSelectStyles1,
                  iconContainer: {
                  top: 10,
                  right: 12,
                  }
                }
               }
                value={isGender}
                Icon={() => {
                  return <Icon name="chevron-down" size={26} color={colors.text} />
                }}
              />
            </View>
          </View>
        </View>
        <View style={[
          {
            backgroundColor : '#FF9F1C',
            justifyContent :'center',
            alignItems:'center',
            height : 50,
            marginTop : 20,
            borderRadius : 10
          }
        ]}>
          <TouchableOpacity onPress={() => onSubmit(isName,isDate.date,isGender)}>
            <Text style={{
              fontSize : 20,
              fontWeight : '500',
              color : '#444'
            }}>
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  </TouchableWithoutFeedback>
  )
}

export const Profile = () => {
  const { profileState } = React.useContext( ProfileContext );
  const date = profileState.date ? new Date(profileState.date) : null;
  const value = date ? date.toLocaleString().slice(date.toLocaleString().indexOf(',')+2) : '';
  const colorIconName = profileState.gender==='male' ? '#FF6700' : '#C3423F';
  const nameIconDate = 'cake-variant';
  const colorIconDate = date ? '#DE1A1A' : '#DDD'
  const nameIconGender = profileState.gender === 'male' ? 'gender-male' : 'gender-female';
  const colorIconGender = profileState.gender === 'male' ? '#8E94F2' : '#A40E4C';
  
  const {transactions} = React.useContext( GlobalContext );
  const totalIncome = transactions.filter(val => +val.amount > 0);
  const totalExpense = transactions.filter(val => +val.amount < 0);
  return (
    <View style={{flex :1,padding : 10,backgroundColor:"#EEE7F8"}}>
      <View style={{alignItems : "center",marginTop : 85, borderTopWidth : 2,borderColor : '#000'}}>
        <Animatable.Image 
          animation='bounceInDown'
          duration={1500}
          style={{
            width : 150,
            height : 150,
            borderColor : '#000',
            borderWidth : 5,
            borderRadius : 150,
            position : "absolute",
            top : -75
          }} 
          source={require('../assets/abc.jpg')}
        />
      </View>
      <Animatable.View animation='bounceInUp' style={{marginTop : 85,padding : 10,flex :1}}>
        <View>
          <View style={{flexDirection : 'row',height : 50,alignItems : "center",marginBottom:20}}>
            <Text style={{flex:2,fontSize : 18,fontWeight : '600'}}>
              Name
            </Text>
            <Text style={{flex :7,fontSize : 18,fontWeight : '500'}}>
              {profileState.name}
            </Text>
            <View style={{flex : 1}}>
              <Icon name='crown' color={colorIconName} size={30}/>
            </View>
          </View>
          <View style={{flexDirection : 'row',height : 50,alignItems : "center",marginBottom:20}}>
            <Text style={{flex:2,fontSize : 18,fontWeight : '600'}}>
              Date
            </Text>
            <Text style={{flex :7,fontSize : 18,fontWeight : '500'}}>
              {value}
            </Text>
            <View style={{flex : 1}}>
              <Icon name={nameIconDate} color={colorIconDate} size={25}/>
            </View>
          </View>
          <View style={{flexDirection : 'row',height : 50,alignItems : "center",marginBottom:20}}>
            <Text style={{flex:2,fontSize : 18,fontWeight : '600'}}>
              Gender
            </Text>
            <Text style={{flex :7,fontSize : 18,fontWeight : '500',textTransform :'capitalize'}}>
              {profileState.gender}
            </Text>
            <View style={{flex : 1}}>
              <Icon name={nameIconGender} size={25} color={colorIconGender}/>
            </View>
          </View>
          <View style={{flexDirection : 'row',height : 50,alignItems : "center",marginBottom:20}}>
            <Text style={{flex:3,fontSize : 18,fontWeight : '600'}}>
              Total Transactions
            </Text>
            <Text style={{flex:3,fontSize : 18,fontWeight : '500',textAlign : 'center'}}>
              {transactions.length}
            </Text>
            <View style={{flex : 1,alignItems :'center'}}>
              <Icon name='contrast-box' size={25} color='#A833B9'/>
            </View>
          </View>
          <View style={{flexDirection : 'row',height : 50,alignItems : "center",marginBottom:20}}>
            <Text style={{flex:3,fontSize : 18,fontWeight : '600'}}>
              Total Income
            </Text>
            <Text style={{flex:3,fontSize : 18,fontWeight : '500',textAlign : 'center'}}>
              {totalIncome.length}
            </Text>
            <View style={{flex : 1,alignItems : 'center'}}>
              <Icon name='heart-outline' size={25} color='#9BC53D'/>
            </View>
          </View>
          <View style={{flexDirection : 'row',height : 50,alignItems : "center",marginBottom:20}}>
            <Text style={{flex:3,fontSize : 18,fontWeight : '600'}}>
              Total Expense
            </Text>
            <Text style={{flex:3,fontSize : 18,fontWeight : '500',textAlign : 'center'}}>
              {totalExpense.length}
            </Text>
            <View style={{flex : 1,alignItems : "center"}}>
              <Icon name='heart-broken-outline' size={25} color='#000'/>
            </View>
          </View>
        </View>
      </Animatable.View>
    </View>
  )
}

export const SignIn = ({navigation}) => {

  const { signIn } = React.useContext(AuthContext);

  const [data,setData] = React.useState({
    email : '',
    password : '',
    check_Input : false,
    secureTextEntry : true
  })

  const textInputChange = (val) => {
    if(val.length !== 0){
      setData({
        ...data,
        email : val,
        check_Input : true
      })
    }
    else {
      setData({
        ...data,
        email : val,
        check_Input : false
      })
    }
  }

  const handlePasswordChange = (val) => {
    setData({
        ...data,
        password : val
      })
  }

  const secureTextEntryChange = () => {
    setData({
      ...data,
      secureTextEntry : !data.secureTextEntry
    })
  }

  const handleLogin = (userName,password) => {
    signIn(userName,password)
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{flex : 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.styleSignIn}>
            <View style={{flex : 1,justifyContent:"center"}}>
              <Animatable.Text animation='tada' style={{marginLeft:20,fontWeight:'600',fontSize:25,width:150}}>
                Welcome!
              </Animatable.Text>
            </View>
            <View style={[{flex : 3,backgroundColor:'#f4f4f4',borderTopLeftRadius:30,borderTopRightRadius:30,padding:20},styles.shadow]}>
              <View style={{borderBottomWidth:1,color:'black'}}>
                <Text style={{fontSize:18,marginTop:15,fontWeight:'500'}}>
                  Email
                </Text>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                  <Icon name='account' size={30}/>
                  <TextInput 
                    style={{fontSize:20,padding:5,marginTop:5,flex:1}} 
                    value={data.email} onChangeText={(val)=>textInputChange(val)} 
                    placeholder='Your Email'
                  />
                  {data.check_Input ? (
                    <Animatable.View animation='bounceIn'>
                      <Icon name='checkbox-marked-circle-outline' size={25} color='green'/>
                    </Animatable.View>)
                  : null}
                </View>
              </View>
              <View style={{borderBottomWidth:1,color:'black'}}>
                <Text style={{fontSize:18,marginTop:30,fontWeight:'500'}}>
                  Password
                </Text>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                  <Icon name='lock' size={25} color='black'/>
                  <TextInput 
                    style={{fontSize:20,padding:5,marginTop:5,flex:1}}  
                    placeholder='Your Password'
                    secureTextEntry={data.secureTextEntry}
                    onChangeText={(val) => handlePasswordChange(val)}
                  />
                  {data.secureTextEntry ? (
                    <Animatable.View>
                      <Icon onPress={() => secureTextEntryChange()} name='eye-off-outline' size={25}/>
                    </Animatable.View>
                  ) : ( 
                    <Animatable.View animation='rubberBand'>
                      <Icon onPress={() => secureTextEntryChange()} name='eye-outline' size={25}/>
                    </Animatable.View>)
                  }
                </View>
              </View>
              <View style={{alignItems:'center',flex:1}}>
                <TouchableOpacity onPress={ () => {handleLogin(data.email,data.password)} } style={[{marginTop:50,width:'90%'}]}>
                  <Animatable.View animation='bounceInLeft'>
                    <LinearGradient
                        colors={['#FFC15E', '#FF9F1C']}
                        style={{borderRadius:10,height:40,alignItems:"center",justifyContent:"center"}}
                      >
                        <Text style={{fontWeight : '500',fontSize:20,color:'#fff'}}>
                          Sign In
                        </Text>
                      </LinearGradient>
                  </Animatable.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{ navigation.navigate('CreateAccount')}} style={[{marginTop:25,width:'90%'}]}>
                  <Animatable.View animation='bounceInRight'>
                    <LinearGradient
                        colors={['#40C9A2', '#2F9C95']}
                        style={{borderRadius:10,height:40,alignItems:"center",justifyContent:"center"}}
                      >
                        <Text style={{fontWeight : '500',fontSize:20,color:'#fff'}}>
                          Sign Up
                        </Text>
                      </LinearGradient>
                  </Animatable.View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export const CreateAccount = ({navigation}) => {

  const { signUp } = React.useContext(AuthContext);

  const [data,setData] = React.useState({
    email : '',
    password : '',
    confirmPassword : '',
    check_Input : false,
    secureTextEntry : true,
    secureConfirmTextEntry : true
  }) 

  const textInputChange = (val) => {
    if(val.length !== 0){
      setData({
        ...data,
        email : val,
        check_Input : true
      })
    }
    else {
      setData({
        ...data,
        email : val,
        check_Input : false
      })
    }
  }

  const handlePasswordChange = (val) => {
    setData({
        ...data,
        password : val
      })
  }

  const secureTextEntryChange = () => {
    setData({
      ...data,
      secureTextEntry : !data.secureTextEntry
    })
  }

  const handleConfirmPasswordChange = (val) => {
    setData({
        ...data,
        confirmPassword : val
      })
  }

  const secureConfirmTextEntryChange = () => {
    setData({
      ...data,
      secureConfirmTextEntry : !data.secureConfirmTextEntry
    })
  }

  const handleLogin = (userName,password) => {
    signUp(userName,password)
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{flex : 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.styleSignIn}>
            <View style={{flex : 1,justifyContent:"center"}}>
              <Animatable.Text animation='shake' style={{marginLeft:20,fontWeight:'600',fontSize:25}}>
                Create Account
              </Animatable.Text>
            </View>
            <View style={[{flex : 3,backgroundColor:'#f4f4f4',borderTopLeftRadius:30,borderTopRightRadius:30,padding:20},styles.shadow]}>
              <View style={{borderBottomWidth:1,color:'black'}}>
                <Text style={{fontSize:18,marginTop:15,fontWeight:'500'}}>
                  Email
                </Text>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                  <Icon name='account' size={30}/>
                  <TextInput 
                    style={{fontSize:20,padding:5,marginTop:5,flex:1}} 
                    value={data.email} onChangeText={(val)=>textInputChange(val)} 
                    placeholder='Your Email'
                  />
                  {data.check_Input ? (
                    <Animatable.View animation='bounceIn'>
                      <Icon name='checkbox-marked-circle-outline' size={25} color='green'/>
                    </Animatable.View>)
                  : null}
                </View>
              </View>
              <View style={{borderBottomWidth:1,color:'black'}}>
                <Text style={{fontSize:18,marginTop:30,fontWeight:'500'}}>
                  Password
                </Text>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                  <Icon name='lock' size={25} color='black'/>
                  <TextInput 
                    style={{fontSize:20,padding:5,marginTop:5,flex:1}}  
                    placeholder='Your Password'
                    secureTextEntry={data.secureTextEntry}
                    onChangeText={(val) => handlePasswordChange(val)}
                  />
                  {data.secureTextEntry ? (
                    <Animatable.View>
                      <Icon onPress={() => secureTextEntryChange()} name='eye-off-outline' size={25}/>
                    </Animatable.View>
                  ) : ( 
                    <Animatable.View animation='rubberBand'>
                      <Icon onPress={() => secureTextEntryChange()} name='eye-outline' size={25}/>
                    </Animatable.View>)
                  }
                </View>
              </View>
              <View style={{borderBottomWidth:1,color:'black'}}>
                <Text style={{fontSize:18,marginTop:30,fontWeight:'500'}}>
                  Confirm Password
                </Text>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                  <Icon name='lock' size={25} color='black'/>
                  <TextInput 
                    style={{fontSize:20,padding:5,marginTop:5,flex:1}}  
                    placeholder='Confirm Your Password'
                    secureTextEntry={data.secureConfirmTextEntry}
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                  />
                  {data.secureConfirmTextEntry ? (
                    <Animatable.View>
                      <Icon onPress={() => secureConfirmTextEntryChange()} name='eye-off-outline' size={25}/>
                    </Animatable.View>
                  ) : ( 
                    <Animatable.View animation='rubberBand'>
                      <Icon onPress={() => secureConfirmTextEntryChange()} name='eye-outline' size={25}/>
                    </Animatable.View>)
                  }
                </View>
              </View>
              <View style={{alignItems:'center',flex:1}}>
                <TouchableOpacity onPress={()=>{ handleLogin(data.email,data.password) }} style={[{marginTop:25,width:'90%'}]}>
                  <Animatable.View animation='fadeInLeft'>
                    <LinearGradient
                        colors={['#40C9A2', '#2F9C95']}
                        style={{borderRadius:10,height:40,alignItems:"center",justifyContent:"center"}}
                      >
                        <Text style={{fontWeight : '500',fontSize:20,color:'#fff'}}>
                          Sign Up
                        </Text>
                      </LinearGradient>
                  </Animatable.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{ navigation.goBack() }} style={{marginTop:30,width:'90%'}}>
                  <Animatable.View animation='bounceInRight'>
                    <View
                        style={{borderRadius:10,height:40,alignItems:"center",justifyContent:"center",borderColor:'#000',borderWidth:2}}
                      >
                        <Text style={{fontWeight : '500',fontSize:20,color:'#000'}}>
                          Sign In
                        </Text>
                      </View>
                  </Animatable.View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export const Splash = ({navigation}) => {
  
  return (
    <View style={styles.styleSplash}>
      <View style={[styles.splashHeader]}>
        <Animatable.Image
          animation='rubberBand'
          duration={2000}
          style={styles.splashImage}
          source={{uri : 'https://zicxaphotos.com/wp-content/uploads/2020/02/T%E1%BB%95ng-h%E1%BB%A3p-h%C3%ACnh-%E1%BA%A3nh-avatar-d%E1%BB%85-th%C6%B0%C6%A1ng-l%C3%A0m-h%C3%ACnh-%C4%91%E1%BA%A1i-di%E1%BB%87n-%C4%91%E1%BA%B9p-nh%E1%BA%A5t-7.jpg'}}
        />
      </View>
      <Animatable.View animation='bounceInUp' style={[styles.splashFooter,styles.shadow]}>
        <Text style={{fontSize:20,fontWeight:'500'}}>Welcome to my App</Text>
        <Text style={{opacity:.5}}>Sign in with account</Text>
        <View style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end',padding:20}}>
          <TouchableOpacity
            onPress={()=> navigation.navigate('SignIn')}>
            <Animatable.View animation='wobble' duration={2000}>
              <LinearGradient
                colors={['#00ff77', '#00e4ab']}
                style={styles.splashGadient}
              >
                <Text style={{fontWeight : '500',fontSize:20,color:'#fff'}}>
                  Get Start
                </Text>
                <Icon name='chevron-double-right' size={24} color='#fff'/>
              </LinearGradient>
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  )
}

const pickerSelectStyles1 = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    backgroundColor: '#f1f1f1'
  }
});
const pickerSelectStyles2 = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'white' ,
    backgroundColor : '#333'
  }
});