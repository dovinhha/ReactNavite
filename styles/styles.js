import { StyleSheet,Dimensions } from 'react-native';

const {height} = Dimensions.get('screen');
const heightLogo = height*0.28;

export const styles = StyleSheet.create({
  screen : {
    flex : 1,
    justifyContent : "center",
    alignItems : "center"
  },
  title : {
    fontSize : 25,
    fontWeight : '500',
    height : 40,
    lineHeight : 40
  },
  money : {
    fontWeight : '700',
    fontSize : 30,
    marginBottom : 15
  },
  incomeExpense : {
    display : "flex",
    flexDirection : "row",
    justifyContent : "space-around",
    height : 80,
    alignItems : "center",
    marginLeft : 10,
    marginRight : 10,
    shadowColor : "black",
    shadowOffset : {width : 0,height : 0},
    shadowOpacity : .4,
    marginTop : 5
  },
  textTransform : {
    textTransform : "uppercase",
    fontWeight : "700"
  },
  income : {
    color : "green",
    textAlign : "center"
  },
  expense : {
    color : 'red',
    textAlign : "center"
  },
  balance : {
    fontSize : 27,
    fontWeight : '500',
  },
  borderBottom : {
    borderBottomColor  : '#888',
    borderBottomWidth : 2,
    marginBottom : 15
  },
  history : {
    flexDirection : "row",
    alignItems : "center",
    backgroundColor : '#FFF',
    height : 40,
    shadowColor : "black",
    shadowOffset : {width : 0,height : 2},
    shadowOpacity : .2,
    borderRightWidth : 5,
    marginBottom : 10,
    flex:9
  },
  historyContainer : {
    height : 200,
    flex:1
  },
  text : {
    fontSize : 18,
    fontWeight : "500"
  },
  textInput : {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    backgroundColor : "#FFF",
    height : 45,
    paddingLeft : 10,
    marginLeft : 5,
    marginRight : 5
  },
  footer : {
    marginTop : 10,
  },
  styleHomeScreenContainer : {
    flex :1,
    padding : 20,
    // backgroundColor : '#BCE7FD'
  },
  styleHomeScreenTextHeader : {
    fontSize : 26,
    fontWeight : "bold"
  },
  styleHomeScreenTextBalance : {
    fontWeight : '600',
    fontSize : 20
  },
  styleSettingScreenView : {
    padding : 10,
    borderBottomWidth : 3,
    width : "90%"
  },
  styleSettingScreenText : {
    fontWeight : "400",
    fontSize : 25
  },
  styleSplash : {
    backgroundColor : '#F96E46',
    flex : 1
  },
  splashHeader : {
    flex : 2,
    justifyContent : 'center',
    alignItems : 'center'
  },
  splashFooter : {
    backgroundColor : '#f4f4f4',
    flex : 1,
    borderTopLeftRadius : 30,
    borderTopRightRadius : 30,
    padding:20
  },
  splashImage : {
    width : heightLogo,
    height : heightLogo,
    borderRadius : 100
  },
  splashGadient : { 
    width :150,
    borderRadius:20,
    alignItems : "center",
    height : 50,
    justifyContent:"center",
    flexDirection:"row"
  },
  styleSignIn : {
    backgroundColor : '#F96E46',
    flex : 1
  },
  shadow : {
    shadowOffset : {width : 0,height : -3},
    shadowOpacity : .4,
    borderColor : '#000'
  },
  viewImage : {
    flex : 1,
    justifyContent: 'center',
    alignItems : 'center'
  },
  image: {
    resizeMode: "cover",
    width : 300,
    height : 300,
    borderWidth : 5,
    borderRadius : 150
  }
});