import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  ImageBackground,
  Image
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

export default function Feedback({navigation}){

  const [modalopen, setmodalopen] = useState(false);  
  const [modal2open, setmodal2open] = useState(false);
  const [newnotes, setnewnotes] = useState("");
  const [loading, setLoading]=useState(false);

  const [curr, setCurr]=useState("");

    const [FAQs,setFAQs]=useState([]);
    const [hidden, setHidden]=useState([false, false, false, false, false, false, false, false, false]);

    function toggleAns(key){
        let x=hidden.slice();
        x[key-1]=!x[key-1];
        setHidden(x);
    }

  async function getData(){
    const temp=[];
    const subscriber=await firestore()
    .collection('Admin').doc('Feedback').get().then(doc=>{
        const data=doc.data();
        const length=data.Feedback.length;
        for(let i=0; i<length; i++){
            temp.push(data.Feedback[i]);
        }
    });
    setLoading(false);
    setFAQs(temp);
}

useEffect(()=>{
    setLoading(true);
    
    getData();
}, []);

    async function sendfeedback(){
      await firestore().collection("Admin").doc("Notifications").get().then(doc=>{
        const data=doc.data().Feedback;
        data.push({Question:curr.Complaint, Answer:newnotes, user:curr.User});
        
        firestore().collection("Admin").doc("Notifications").update({
          Feedback:data
        }).then(alert("Sent feedback"));
      })
      
    }

    function handlemodal(){
        setmodalopen(false);
    }

    function handle2modal(){
      setmodal2open(false);
    }

    return(
        <LinearGradient colors={[ '#1e2127','#000','#1e2127']} style={{flex: 8, justifyContent: 'center'}}>

<Modal visible = {modal2open} animationType = 'slide' transparent = {true}>
            <View style= {{flex: 1,justifyContent: 'flex-end'}}>
            <View style={{opacity: .88, backgroundColor: 'black', height: '100%' }}>
                
            <ImageBackground source={require('../assets/light.jpg')} style={{width:360, height:200,elevation:10}} imageStyle = {{borderWidth: 2, borderColor: 'darkred'}} >
                        <Image source={require('../assets/designing/logocardL.png')} style={{width:100,height:40,position: 'absolute',bottom:160,left:10,alignSelf:'flex-end'}}/>
                        <Text style={[{color:'#000',fontWeight:'bold'}, {fontSize:17, position:'absolute', bottom:5, left:10,}]}>{auth().currentUser.email}</Text>
                        <Text style={[{color:'darkred',fontWeight:'bold', textAlign: 'center', fontFamily: 'times new roman'}, {fontSize:32, position:'absolute', bottom:80, left:120,}]}>Admin</Text>
                        <Image source={require('../assets/visa.png')} style={{width:40,height:40,position:'absolute',bottom:5,right:10,alignSelf:'flex-end'}}/>
            </ImageBackground>

            <TouchableOpacity onPress={() => {navigation.navigate('Dashboard'); handle2modal()}} style = {{ marginTop: 5 , backgroundColor: '#841851', borderBottomColor: 'maroon', borderWidth: 2, opacity: 0.7}}>
              <Text style ={{color: '#c0c0c0', fontSize: 20, fontWeight: 'bold', fontFamily: 'times new roman', marginLeft: 10, marginTop: 15, marginBottom: 10}}> <Icon name="home" size={25} color="#c0c0c0" />  Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {navigation.navigate('Display'); handle2modal()}} style = {{ marginTop: 5 , backgroundColor: '#841851', borderBottomColor: 'maroon', borderWidth: 2, opacity: 0.7}}>
              <Text style ={{color: '#c0c0c0', fontSize: 20, fontWeight: 'bold', fontFamily: 'times new roman', marginLeft: 10, marginTop: 15, marginBottom: 10}}> <Icon name="users" size={25} color="#c0c0c0"/>  Display All Users</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {navigation.navigate('Admin_Notifications'); handle2modal()}} style = {{ marginTop: 5 , backgroundColor: '#841851', borderBottomColor: 'maroon', borderWidth: 2, opacity: 0.7}}>
              <Text style ={{color: '#c0c0c0', fontSize: 20, fontWeight: 'bold', fontFamily: 'times new roman', marginLeft: 10, marginTop: 15, marginBottom: 10}}> <Icon name="bell" size={25} color="#c0c0c0"/>  Add Notificaions</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handle2modal()} style = {{ marginTop: 5 , backgroundColor: '#841851', borderBottomColor: 'maroon', borderWidth: 2, opacity: 0.7}}>
              <Text style ={{color: '#c0c0c0', fontSize: 20, fontWeight: 'bold', fontFamily: 'times new roman', marginLeft: 10, marginTop: 15, marginBottom: 10}}> <Icon name="address-card" size={25} color="#c0c0c0"/>  Feedback Reply</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {navigation.navigate('Settings'), handle2modal()}} style = {{ marginTop: 5 , backgroundColor: '#841851', borderBottomColor: 'maroon', borderWidth: 2, opacity: 0.7}}>
              <Text style ={{color: '#c0c0c0', fontSize: 20, fontWeight: 'bold', fontFamily: 'times new roman', marginLeft: 10, marginTop: 15, marginBottom: 10}}> <Icon name="gears" size={25} color="#c0c0c0"/>  Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {navigation.navigate('Admin_Statements'); handle2modal()}} style = {{ marginTop: 5 , backgroundColor: '#841851', borderBottomColor: 'maroon', borderWidth: 2, opacity: 0.7}}>
              <Text style ={{color: '#c0c0c0', fontSize: 20, fontWeight: 'bold', fontFamily: 'times new roman', marginLeft: 10, marginTop: 15, marginBottom: 10}}> <Icon name="envelope-o" size={25} color="#c0c0c0" />  Check Statement</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {navigation.navigate('Login'); handle2modal()}} style = {{ marginTop: 5 , backgroundColor: '#841851', borderBottomColor: 'maroon', borderWidth: 2, opacity: 0.7}}>
              <Text style ={{color: '#c0c0c0', fontSize: 20, fontWeight: 'bold', fontFamily: 'times new roman', marginLeft: 10, marginTop: 10, marginBottom: 10}}> <Icon name="sign-out" size={25} color="#c0c0c0" />  Logout</Text>
            </TouchableOpacity>

            </View>
            </View>
            </Modal>

        <Modal visible = {modalopen} animationType = 'slide' transparent = {true}>
            <View style= {{flex: 1,justifyContent: 'flex-end'}}>
            <View style={{opacity: .9, backgroundColor: 'black', height: '80%', borderTopLeftRadius: 40,borderTopRightRadius: 40,borderTopColor: '#c0c0c0',borderLeftColor: '#c0c0c0',borderRightColor: '#c0c0c0', borderTopWidth: 4, borderLeftWidth: 4, borderRightWidth: 4, }}>
                 <TextInput
                    placeholder="Feedback Reply ..."
                    style={styles.notification_input}
                    textAlignVertical="top"
                    multiline={true}
                    placeholderTextColor={"#c0c0c0"}
                    onChangeText={setnewnotes}
                ></TextInput>
                 <TouchableOpacity style={{marginTop: 50, marginLeft: 120, marginRight: 120, backgroundColor: 'transparent', borderRadius: 20}}
                    onPress= {() => {handlemodal() ; sendfeedback(); }} 
                    >
                     <Text style= {[{textAlign: 'center', color: '#c0c0c0', backgroundColor: "#841851", borderColor: "#c0c0c0",borderWidth: 4, fontSize: 20, fontWeight: 'bold', borderRadius: 15, paddingTop:5}]}>Send</Text> 
                </TouchableOpacity>
            </View>
            </View>
            </Modal>
        <FlatList
            data={FAQs}
            renderItem={({ item }) => (
            <View style={{backgroundColor: '#841851', borderRadius: 15,paddingTop: 25,paddingBottom: 25,paddingVertical:15,borderBottomWidth:1.5,borderTopWidth:0,borderColor:'#14062E',paddingHorizontal:10, margin: 10, marginBottom: 0}}>
                <View style = {{flex:1,flexDirection:'row'}} >
                    <Text style={[{fontSize:20,color:'white',flex:10}, {fontWeight:'normal'}]}>{item.User}</Text>  
                    <TouchableOpacity disabled={false} style={{flex:1}} onPress={()=>toggleAns(item.key)}>
                        <Text style={[{fontSize:25,fontWeight:'bold'}, {color:'#000'}]}>{!hidden[item.key-1]?"\u{1F448}":"\u{1F447}"}</Text>                 
                    </TouchableOpacity>
                </View>
                {hidden[item.key-1]?<Text style={[{fontSize:18, fontWeight: 'bold'},{color:'#000'}]}>FeedBack: {item.Complaint}</Text>:<></>}
                {hidden[item.key-1]?<TouchableOpacity onPress={() => {setmodalopen(true); setCurr(item)}}>
                    <Text style= {[styles.buttons , {textAlign: 'center', color: '#c0c0c0'}]}>Reply</Text>
                </TouchableOpacity>:<></>}

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
                
                  <TouchableOpacity onPress={() => navigation.navigate("Admin_Statements")}>
                    <Icon name="envelope-o" size={30} color="#c0c0c0" style={{padding: 2, margin:2}}/>
                    {/*<Text style= {{textAlign: 'center', color: '#c0c0c0',  textAlign: 'center',fontSize: 15, fontWeight: 'bold'}}>History</Text>*/}
                  </TouchableOpacity>
                
                </View>
                
                <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                
                  <TouchableOpacity onPress={() => setmodal2open(true)}>
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