import React, {useState} from 'react';
import {
  Text,
  View,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal,
  Button,
} from 'react-native';

import { Linking } from 'react-native'
import {styles} from '../Styles/StyleSheet';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import GestureRecognizer from 'react-native-swipe-gestures';
import { FloatingMenu } from 'react-native-floating-action-menu';
import Loader from '../screens/loading';
export default function Settings({navigation}){

    const [old, setold] = useState("");

    const [newpass, setnewpass] = useState("");

    const [modalopen, setmodalopen] = useState(false);

    const [confirm, setconfirm] = useState("");

    const [loading, setLoading]=useState(false);


    function changePassword(){
        
    }

    function goback(){
      navigation.navigate('Dashboard');
    }
    function handlemodal(){
      setmodalopen(false);
    }
    return(
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

            <TouchableOpacity onPress={() => {navigation.navigate('Display'); handlemodal()}} style = {{ marginTop: 5 , backgroundColor: '#841851', borderBottomColor: 'maroon', borderWidth: 2, opacity: 0.7}}>
              <Text style ={{color: '#c0c0c0', fontSize: 20, fontWeight: 'bold', fontFamily: 'times new roman', marginLeft: 10, marginTop: 15, marginBottom: 10}}> <Icon name="users" size={25} color="#c0c0c0"/>  Display All Users</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {navigation.navigate('Admin_Notifications'); handlemodal()}} style = {{ marginTop: 5 , backgroundColor: '#841851', borderBottomColor: 'maroon', borderWidth: 2, opacity: 0.7}}>
              <Text style ={{color: '#c0c0c0', fontSize: 20, fontWeight: 'bold', fontFamily: 'times new roman', marginLeft: 10, marginTop: 15, marginBottom: 10}}> <Icon name="bell" size={25} color="#c0c0c0"/>  Add Notificaions</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {navigation.navigate('Feedback'); handlemodal()}} style = {{ marginTop: 5 , backgroundColor: '#841851', borderBottomColor: 'maroon', borderWidth: 2, opacity: 0.7}}>
              <Text style ={{color: '#c0c0c0', fontSize: 20, fontWeight: 'bold', fontFamily: 'times new roman', marginLeft: 10, marginTop: 15, marginBottom: 10}}> <Icon name="address-card" size={25} color="#c0c0c0"/>  Feedback Reply</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handlemodal()} style = {{ marginTop: 5 , backgroundColor: '#841851', borderBottomColor: 'maroon', borderWidth: 2, opacity: 0.7}}>
              <Text style ={{color: '#c0c0c0', fontSize: 20, fontWeight: 'bold', fontFamily: 'times new roman', marginLeft: 10, marginTop: 15, marginBottom: 10}}> <Icon name="gears" size={25} color="#c0c0c0"/>  Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {navigation.navigate('Admin_Statements'); handlemodal()}} style = {{ marginTop: 5 , backgroundColor: '#841851', borderBottomColor: 'maroon', borderWidth: 2, opacity: 0.7}}>
              <Text style ={{color: '#c0c0c0', fontSize: 20, fontWeight: 'bold', fontFamily: 'times new roman', marginLeft: 10, marginTop: 15, marginBottom: 10}}> <Icon name="envelope-o" size={25} color="#c0c0c0" />  Check Statement</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {navigation.navigate('Login'); handlemodal()}} style = {{ marginTop: 5 , backgroundColor: '#841851', borderBottomColor: 'maroon', borderWidth: 2, opacity: 0.7}}>
              <Text style ={{color: '#c0c0c0', fontSize: 20, fontWeight: 'bold', fontFamily: 'times new roman', marginLeft: 10, marginTop: 10, marginBottom: 10}}> <Icon name="sign-out" size={25} color="#c0c0c0" />  Logout</Text>
            </TouchableOpacity>

            </View>
            </View>
            </Modal>

            <View style={[{flex: 1}]}>
                    <Text style = {{margin: 10, marginTop: 20, fontSize: 20, fontWeight: 'bold', color: '#841851'}}>Enter Old Password:</Text>
            <TextInput
                    placeholder="Old Password..."
                    style={[styles.notification_input, {height: '14%', borderColor: '#841851'}]}
                    textAlignVertical="top"
                    placeholderTextColor={"#c0c0c0"}
                    onChangeText={setold}
                ></TextInput>
                                   
                    <Text style = {{margin: 10, marginTop: 20, fontSize: 20, fontWeight: 'bold', color: '#841851'}}>Enter New Password:</Text>

                <TextInput
                    placeholder="New Password..."
                    style={[styles.notification_input, {height: '14%', borderColor: '#841851'}]}
                    textAlignVertical="top"
                    placeholderTextColor={"#c0c0c0"}
                    onChangeText={setnewpass}
                ></TextInput>
                                    
                    <Text style = {{margin: 10, marginTop: 20, fontSize: 20, fontWeight: 'bold', color: '#841851'}}>Confirm New Password:</Text>
                
                <TextInput
                    placeholder="Confirm New Password..."
                    style={[styles.notification_input, {height: '14%', borderColor: '#841851'}]}
                    textAlignVertical="top"
                    placeholderTextColor={"#c0c0c0"}
                    onChangeText={setconfirm}
                ></TextInput>

                <TouchableOpacity onPress={() => {changePassword(); goback() ; Alert.alert('Password Reset Complete')}}>
                    <Text style= {[styles.buttons , {textAlign: 'center', color: '#c0c0c0', marginTop: 20, backgroundColor:'#841851', color: '#c0c0c0', borderColor: '#c0c0c0', borderWidth: 2, paddingBottom: 3}]}>Change  <Icon name="arrow-left" size={20} color="#c0c0c0"/></Text>
                    
                </TouchableOpacity>

            </View>
            <LinearGradient colors={['#14062E','#100010','#841851','#100010', '#14062E' ]}  start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }} style={{flexDirection: 'row',borderColor:'#00008b',borderTopWidth:4,}}>
                
                <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                  
                  <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
                      <Icon name="home" size={30} color="#c0c0c0" style={{padding: 2, margin:2}}/>
                      {/*<Text style= {{textAlign: 'center', color: '#c0c0c0', textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>Home</Text>*/}
                  </TouchableOpacity>
                
                </View>

                <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                
                  <TouchableOpacity onPress={() => navigation.navigate("Admin_Statements")}>
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