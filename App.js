import * as React from 'react';
import {Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';


import Login from './revision/login';
import User from './screens/user';
import Faq from './screens/faq';
import Contact from './screens/contact';
import Notifications from './screens/notifications';

const Stack=createNativeStackNavigator();

export default function App(){
  const [dark, setDark]=React.useState(false);
  const [check, setCheck]=React.useState(false);

    async function getDark(){
      try{
        setCheck(dark);
        while(true){
          const read=await AsyncStorage.getItem('darkMode');
          if(read!=null){
              
              setDark(JSON.parse(read));
              if(dark!==check){
                break;
              }
          }
          else{
            break;
          }
        }
      }
      catch(err){
        console.log(err)
      }
    }

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />


        <Stack.Screen name="User" component={User} options={dark?{
          headerTitle:(props)=>(
            <Image source={require('./assets/designing/logocard.png')}
              style={{width:140, height:40}}
            />
          ),
          headerBackVisible:false,
          headerTitleAlign:'center',
          headerTintColor: '#fff',
          headerStyle:{
            backgroundColor:'#841851',
          }
        }:{
          headerTitle:(props)=>(
            <Image source={require('./assets/designing/logocard.png')}
              style={{width:140, height:40}}
            />
          ),
          headerBackVisible:false,
          headerTitleAlign:'center',
          headerTintColor: '#fff',
          headerStyle:{
            //elevation:10,
            backgroundColor:'#801818',
          }
        }} listeners={{state:getDark}} />


        <Stack.Screen name="FAQ" component={Faq}  options={dark?{
          headerRight:(props)=>(
            <Image source={require('./assets/designing/logocard.png')}
              style={{width:120, height:35}}
            />
          ),
          headerTitleAlign:'left',
          headerTintColor: '#fff',
          headerStyle:{
            //elevation:2,
          backgroundColor:'#841851',
          }
        }:{
          headerRight:(props)=>(
            <Image source={require('./assets/designing/logocard.png')}
              style={{width:120, height:35}}
            />
          ),
          headerTitleAlign:'left',
          headerTintColor: '#fff',
          headerStyle:{
          backgroundColor:'#801818',
          }
        }}/>


        <Stack.Screen name="ContactUs" component={Contact}  options={dark?{
          headerRight:(props)=>(
            <Image source={require('./assets/designing/logocard.png')}
              style={{width:120, height:35}}
            />
          ),
          headerTitleAlign:'left',
          headerTintColor: '#fff',
          headerStyle:{
            //elevation:2,
          backgroundColor:'#841851',
          }
        }:{
          headerRight:(props)=>(
            <Image source={require('./assets/designing/logocard.png')}
              style={{width:120, height:35}}
            />
          ),
          headerTitleAlign:'left',
          headerTintColor: '#fff',
          headerStyle:{
          backgroundColor:'#801818',
          }
        }}/>

        <Stack.Screen name="Notifications" component={Notifications}  options={dark?{
            headerRight:(props)=>(
              <Image source={require('./assets/designing/logocard.png')}
                style={{width:120, height:35}}
              />
            ),
            headerTitleAlign:'left',
            headerTintColor: '#fff',
            headerStyle:{
              //elevation:2,
            backgroundColor:'#841851',
            }
          }:{
            headerRight:(props)=>(
              <Image source={require('./assets/designing/logocard.png')}
                style={{width:120, height:35}}
              />
            ),
            headerTitleAlign:'left',
            headerTintColor: '#fff',
            headerStyle:{
            backgroundColor:'#801818',
            }
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}