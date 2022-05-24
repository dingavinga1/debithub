import React, {useState} from 'react';
import {
  Text,
  View,
  Alert,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';

import {styles} from '../Styles/StyleSheet';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Display({navigation}){

    const [FAQs,setFAQs]=useState([
        { user: 'Muhammad Huzaifa',email:'huzzaifaasim@gmail.com', cnic: '33102-4366174-5', status: 'Customer + Admin', amount: '0', key:'1'},
        { user: 'Abdullah Irfan',email:'abdullahirfan2001@gmail.com',cnic: '33102-4366174-5',status: 'Customer', amount: '200,000', key:'2'},
        { user: 'Aisha Irfan',email:'aishairfan1851@gmail.com', cnic: '33102-4366174-5', status: 'Customer', amount: '165,700', key:'3'},
        { user: 'Muhammad Usman Shahid',email:'codesbyusman@gmail.com', cnic: '33102-4366174-5', status: 'Customer', amount: '5,000', key:'4'},
        { user: 'Musab Imran',email:'musabimran@gmail.com', cnic: '33102-4366174-5', status: 'Customer', amount: '10,000', key:'5'},
        { user: 'Ismail Ramzan',email:'ismailramzan0001@gmail.com', cnic: '33102-4366174-5', status: 'Customer', amount: '20,000', key:'6'},
    ]);
    const [hidden, setHidden]=useState([false, false, false, false, false, false, false, false, false]);

    function toggleAns(key){
        let x=hidden.slice();
        x[key-1]=!x[key-1];
        setHidden(x);
    }

  return (
    
    <LinearGradient colors={[ '#1e2127','#000','#1e2127']} style={{flex: 8, justifyContent: 'center'}}>
        <FlatList
            data={FAQs}
            renderItem={({ item }) => (
            <View style={{paddingVertical:15,borderBottomWidth:1.5,borderTopWidth:0,borderColor:'#801818',paddingHorizontal:10}}>
                <View style = {{flex:1,flexDirection:'row'}} >
                    <Text style={[{fontSize:20,color:'white',flex:10}, {fontWeight:'normal'}]}>User{item.key}:  {item.user}</Text>  
                    <TouchableOpacity disabled={false} style={{flex:1}} onPress={()=>toggleAns(item.key)}>
                        <Text style={[{fontSize:25,fontWeight:'bold'}, {color:'#841851'}]}>{!hidden[item.key-1]?"\u{25BC}":"\u{25B2}"}</Text>
                    </TouchableOpacity>
                </View>
                {hidden[item.key-1]?<Text style={[{fontSize:20},{color:'#841851'}]}>Email: {item.email}</Text>:<></>}
                {hidden[item.key-1]?<Text style={[{fontSize:20},{color:'#841851'}]}>Cnic: {item.cnic}</Text>:<></>}
                {hidden[item.key-1]?<Text style={[{fontSize:20},{color:'#841851'}]}>Status: {item.status}</Text>:<></>}
                {hidden[item.key-1]?<Text style={[{fontSize:20},{color:'#841851'}]}>Current Balance: {item.amount}. Rs</Text>:<></>}

            </View>        
            )}
        />


            <LinearGradient colors={['#14062E','#100010','#841851','#100010', '#14062E' ]}  start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }} style={{flexDirection: 'row',borderColor:'#00008b',borderTopWidth:4,}}>
                
                <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                  
                  <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                      <Icon name="home" size={30} color="#c0c0c0"/>
                      <Text style= {{textAlign: 'center', color: 'white'}}>Home</Text>
                  </TouchableOpacity>
                
                </View>

                <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                
                  <TouchableOpacity onPress={() => Alert.alert("Button Pressed")}>
                    <Icon name="user-circle-o" size={30} color="#c0c0c0" />
                    <Text style= {{textAlign: 'center', color: 'white'}}>User</Text>
                  </TouchableOpacity>
                
                </View>
                
                <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                
                  <TouchableOpacity onPress={() => Alert.alert("Button Pressed")}>
                    <Icon name="bars" size={30} color="#c0c0c0"/>
                    <Text style= {{textAlign: 'center', color: 'white'}}>Menu</Text>
                  </TouchableOpacity>
                  
                </View>
                
                <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                
                  <TouchableOpacity onPress={() => Alert.alert("Button Pressed")}>
                    <Icon name="download" size={30} color="#c0c0c0"/>
                    <Text style= {{color: 'white'}}>Download</Text>
                  </TouchableOpacity>
                  
                </View>

              </LinearGradient>


   </LinearGradient>
    );
}