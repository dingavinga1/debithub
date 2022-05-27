import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Alert,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal,
} from 'react-native';

import {styles} from '../Styles/StyleSheet';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Display({navigation}){
    const [count, setCount]=useState(0);
    const [FAQs,setFAQs]=useState([]);
    const [hidden, setHidden]=useState([]);

    const [modalopen, setmodalopen] = useState(false);

    async function getData(){
      const temp=[];

      const subscriber=await firestore().collection("AccountData")
      .get()
      .then(querySnapshot=>{
        querySnapshot.forEach(documentSnapshot=>{
          const u=documentSnapshot.data();
          temp.push({email:documentSnapshot.id, data:u});
        });
        for(let i=0; i<temp.length; i++){
          hidden.push(false);
          temp[i]["key"]=i+1;
          console.log(temp[i]["key"]);
        }
      });
      
      setFAQs(temp);
    }
    
    useEffect(()=>{
      if(count===0){
        getData();
        setCount(1);
      }
    });

    function toggleAns(key){
      let x=hidden.slice();
      x[key-1]=!x[key-1];
      setHidden(x);
  }

    function handlemodal(){
      setmodalopen(false);
    }

  return (
    
    <LinearGradient colors={[ '#1e2127','#000','#1e2127']} style={{flex: 8, justifyContent: 'center'}}>
      <Modal visible = {modalopen} animationType = 'slide' transparent = {true}>
            <View style= {{flex: 1,justifyContent: 'flex-end'}}>
            <View style={{opacity: .88, backgroundColor: 'black', height: '100%' }}>
                
            <ImageBackground source={require('../assets/light.jpg')} style={{width:360, height:200,elevation:10}} imageStyle = {{borderWidth: 2, borderColor: 'darkred'}} >
                        <Image source={require('../assets/designing/logocardL.png')} style={{width:100,height:40,position: 'absolute',bottom:160,left:10,alignSelf:'flex-end'}}/>
                        <Text style={[{color:'#000',fontWeight:'bold'}, {fontSize:17, position:'absolute', bottom:5, left:10,}]}>{auth().currentUser.email}</Text>
                        <Text style={[{color:'darkred',fontWeight:'bold', textAlign: 'center', fontFamily: 'times new roman'}, {fontSize:32, position:'absolute', bottom:80, left:120,}]}>Admin</Text>
                        <Image source={require('../assets/visa.png')} style={{width:40,height:40,position:'absolute',bottom:5,right:10,alignSelf:'flex-end'}}/>
            </ImageBackground>

            <TouchableOpacity onPress={() => {navigation.navigate('Dashboard'); handlemodal()}} style = {{ marginTop: 5 , backgroundColor: '#841851', borderBottomColor: 'maroon', borderWidth: 2, opacity: 0.7}}>
              <Text style ={{color: '#c0c0c0', fontSize: 20, fontWeight: 'bold', fontFamily: 'times new roman', marginLeft: 10, marginTop: 15, marginBottom: 10}}> <Icon name="home" size={25} color="#c0c0c0" />  Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handlemodal()} style = {{ marginTop: 5 , backgroundColor: '#841851', borderBottomColor: 'maroon', borderWidth: 2, opacity: 0.7}}>
              <Text style ={{color: '#c0c0c0', fontSize: 20, fontWeight: 'bold', fontFamily: 'times new roman', marginLeft: 10, marginTop: 15, marginBottom: 10}}> <Icon name="users" size={25} color="#c0c0c0"/>  Display All Users</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {navigation.navigate('Admin Notifications'); handlemodal()}} style = {{ marginTop: 5 , backgroundColor: '#841851', borderBottomColor: 'maroon', borderWidth: 2, opacity: 0.7}}>
              <Text style ={{color: '#c0c0c0', fontSize: 20, fontWeight: 'bold', fontFamily: 'times new roman', marginLeft: 10, marginTop: 15, marginBottom: 10}}> <Icon name="bell" size={25} color="#c0c0c0"/>  Add Notificaions</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {navigation.navigate('Feedback'); handlemodal()}} style = {{ marginTop: 5 , backgroundColor: '#841851', borderBottomColor: 'maroon', borderWidth: 2, opacity: 0.7}}>
              <Text style ={{color: '#c0c0c0', fontSize: 20, fontWeight: 'bold', fontFamily: 'times new roman', marginLeft: 10, marginTop: 15, marginBottom: 10}}> <Icon name="address-card" size={25} color="#c0c0c0"/>  Feedback Reply</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {navigation.navigate('Settings'); handlemodal()}} style = {{ marginTop: 5 , backgroundColor: '#841851', borderBottomColor: 'maroon', borderWidth: 2, opacity: 0.7}}>
              <Text style ={{color: '#c0c0c0', fontSize: 20, fontWeight: 'bold', fontFamily: 'times new roman', marginLeft: 10, marginTop: 15, marginBottom: 10}}> <Icon name="gears" size={25} color="#c0c0c0"/>  Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {navigation.navigate('Admin Statements'); handlemodal()}} style = {{ marginTop: 5 , backgroundColor: '#841851', borderBottomColor: 'maroon', borderWidth: 2, opacity: 0.7}}>
              <Text style ={{color: '#c0c0c0', fontSize: 20, fontWeight: 'bold', fontFamily: 'times new roman', marginLeft: 10, marginTop: 15, marginBottom: 10}}> <Icon name="envelope-o" size={25} color="#c0c0c0" />  Check Statement</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {navigation.navigate('Login'); handlemodal()}} style = {{ marginTop: 5 , backgroundColor: '#841851', borderBottomColor: 'maroon', borderWidth: 2, opacity: 0.7}}>
              <Text style ={{color: '#c0c0c0', fontSize: 20, fontWeight: 'bold', fontFamily: 'times new roman', marginLeft: 10, marginTop: 10, marginBottom: 10}}> <Icon name="sign-out" size={25} color="#c0c0c0" />  Logout</Text>
            </TouchableOpacity>

            </View>
            </View>
            </Modal>
        <FlatList
            data={FAQs}
            renderItem={({ item }) => (
            <View style={{paddingVertical:15,borderBottomWidth:1.5,borderTopWidth:0,borderColor:'#801818',paddingHorizontal:10}}>
                <View style = {{flex:1,flexDirection:'row'}} >
                    <Text style={[{fontSize:20,color:'white',flex:10}, {fontWeight:'normal'}]}>{item.email}</Text>  
                    <TouchableOpacity disabled={false} style={{flex:1}} onPress={()=>toggleAns(item.key)}>
                        <Text style={[{fontSize:25,fontWeight:'bold'}, {color:'#841851'}]}>{!hidden[item.key-1]?"\u{1F448}":"\u{1F447}"}</Text>
                    </TouchableOpacity>
                </View>
                {hidden[item.key-1]?<Text style={[{fontSize:20},{color:'#841851'}]}>Name: {item.data.Name}</Text>:<></>}
                {hidden[item.key-1]?<Text style={[{fontSize:20},{color:'#841851'}]}>CNIC: {item.data.CNIC}</Text>:<></>}
                {hidden[item.key-1]?<Text style={[{fontSize:20},{color:'#841851'}]}>Balance: Rs. {item.data.balance}</Text>:<></>}

            </View>        
            )}
        />


<LinearGradient colors={['#14062E','#100010','#841851','#100010', '#14062E' ]}  start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }} style={{flexDirection: 'row',borderColor:'#00008b',borderTopWidth:4,}}>
                
                <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                  
                  <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
                      <Icon name="home" size={30} color="#c0c0c0" style={{padding: 2, margin:2}}/>
                      {/*<Text style= {{textAlign: 'center', color: '#c0c0c0', textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>Home</Text>*/}
                  </TouchableOpacity>
                
                </View>

                <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                
                  <TouchableOpacity onPress={() => navigation.navigate("Admin Statements")}>
                    <Icon name="envelope-o" size={30} color="#c0c0c0" style={{padding: 2, margin:2}}/>
                    {/*<Text style= {{textAlign: 'center', color: '#c0c0c0',  textAlign: 'center',fontSize: 15, fontWeight: 'bold'}}>History</Text>*/}
                  </TouchableOpacity>
                
                </View>
                
                <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                
                  <TouchableOpacity onPress={() => setmodalopen(true)}>
                    <Icon name="bars" size={30} color="#c0c0c0" style={{padding: 2, margin:2}}/>
                    {/*<Text style= {{textAlign: 'center', color: '#c0c0c0',  textAlign: 'center',fontSize: 15, fontWeight: 'bold'}}>Menu</Text>*/}
                  </TouchableOpacity>
                  
                </View>
                
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10}}>
                          
                          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                              <Icon name="sign-out" size={30} color="#c0c0c0" style={{padding: 2, margin:2}}/>
                          </TouchableOpacity>
                            {/*<Text style={{color: '#c0c0c0', textAlign: 'center',fontWeight: 'bold', fontSize: 15}}>logout</Text>*/}
                        
                  </View>

              </LinearGradient>


   </LinearGradient>
    );
}