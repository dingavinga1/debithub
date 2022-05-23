import React from 'react-native';
import {StyleSheet} from 'react-native';

export const styles=StyleSheet.create ({
    container: {
      flex:1,
      backgroundColor: '#8432df',
      justifyContent: 'center',
      textAlign: 'center',
    },
    container2: {
      flex: 1,
      justifyContent: 'center',
    },
    Touchables:{
      backgroundColor: 'transparent',
      marginLeft:120,
      marginRight: 120,
      borderRadius: 20,
    },
    logo: {
        width: 150,
        height: 150,
    },
    card: {
      height: 200 ,
      width: 325,
      marginLeft: 35,
      marginRight: 35,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: '#7393B3'
    },
    graph:{
        marginLeft: 35,
        marginRight: 35,
    },
    input: {
       padding: 8,
        margin: 10,
       marginTop: 50,
        borderWidth: 2,
        borderRadius: 10,
        color: 'white',
        fontSize: 15,
        borderColor: 'transparent',
        borderBottomColor: '#fff',
    },
    multilineinput: {
      padding: 8,
      margin: 10,
      marginTop: 10,
      marginLeft:30,
      marginRight: 30,
      borderWidth: 2,
      borderRadius: 10,
      color: 'white',
      fontSize: 15,
      borderColor: 'transparent',
      borderColor: '#fff',
      fontWeight: 'bold'
   },
    textinputstyles: {
      fontSize: 18,
      marginLeft: 10,
      marginRight: 10,
      color: 'black',
      fontWeight: 'bold',
      borderWidth: 2,
      borderRadius: 10,
      borderColor: 'transparent',
      borderBottomColor: '#fff' 
    },
    pickerstyle: { 
      color: 'white',
      marginLeft: 20,
      marginRight: 20,
      fontSize: 15,
      backgroundColor: 'transparent',
      borderRadius: 10,
      opacity: 0.9,
      borderColor: 'transparent',
      borderWidth: 2,
      borderBottomColor: 'white'
    },
    denyinputs: {
      padding: 2,
      margin: 30,
      marginTop: 4,
      borderWidth: 2,
      borderRadius: 10,
      color: 'white',
      fontSize: 15,
      borderColor: 'transparent',
      borderBottomColor: '#fff',
    },
    header:{
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize:30,
      color: '#fff',
      justifyContent: 'center',
      fontFamily: 'times new roman'
    },
    buttons: {
      backgroundColor: 'black',
      borderStyle: 'solid',
      borderWidth: 4,
      borderColor: '#fff',
      borderRadius: 15,
      marginTop: 7,
      paddingTop: 4,
      marginBottom: 5,
      textAlign: 'center',
      fontSize: 20,
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'times new roman',
    },
    icons:{
      paddingTop: 15,
      color: 'white',
      fontSize: 20
    },
  });