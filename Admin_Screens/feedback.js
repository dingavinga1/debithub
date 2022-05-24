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
  KeyboardAvoidingView
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
  const [newnotes, setnewnotes] = useState("");

    const [FAQs,setFAQs]=useState([
        { user: 'Muhammad Huzaifa',feedback: 'I am having Problems during my login', date: '01/05/2022', key:'1'},
        { user: 'Abdullah Irfan',feedback: 'i am having problems during my logout', date: '01/04/2022',key:'2'},
        { user: 'Aisha Irfan',feedback: 'I ma not still capable of transferring my funds', date: '23/03/2022',key:'3'},
        { user: 'Muhammad Usman Shahid',feedback: 'I cant pay my online bills please help', date: '31/12/2021',key:'4'},
        { user: 'Musab Imran',feedback: 'the statement shoen in my account is wrong', date: '06/06/2022',key:'5'},
        { user: 'Ismail Ramzan',feedback: 'The interface is really very amazing', date: '10/22/2022',key:'6'},
    ]);
    const [hidden, setHidden]=useState([false, false, false, false, false, false, false, false, false]);

    function toggleAns(key){
        let x=hidden.slice();
        x[key-1]=!x[key-1];
        setHidden(x);
    }

    function sendfeedback(){

    }

    function handlemodal(){
        setmodalopen(false);
    }

    return(
        <LinearGradient colors={[ '#1e2127','#000','#1e2127']} style={{flex: 8, justifyContent: 'center'}}>
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
                    onPress= {() => {handlemodal() ; sendfeedback() ; Alert.alert('New Notificaion Added')}} 
                    >
                     <Text style= {[{textAlign: 'center', color: '#c0c0c0', backgroundColor: "#841851", borderColor: "#c0c0c0",borderWidth: 4, fontSize: 20, fontWeight: 'bold', borderRadius: 15, paddingTop:5}]}>ADD</Text> 
                </TouchableOpacity>
            </View>
            </View>
            </Modal>
        <FlatList
            data={FAQs}
            renderItem={({ item }) => (
            <View style={{backgroundColor: '#841851', borderRadius: 15,paddingTop: 25,paddingBottom: 25,paddingVertical:15,borderBottomWidth:1.5,borderTopWidth:0,borderColor:'#14062E',paddingHorizontal:10}}>
                <View style = {{flex:1,flexDirection:'row'}} >
                    <Text style={[{fontSize:20,color:'white',flex:10}, {fontWeight:'normal'}]}>User{item.key}:  {item.user}</Text>  
                    <TouchableOpacity disabled={false} style={{flex:1}} onPress={()=>toggleAns(item.key)}>
                        <Text style={[{fontSize:25,fontWeight:'bold'}, {color:'#000'}]}>{!hidden[item.key-1]?"\u{25BC}":"\u{25B2}"}</Text>                 
                    </TouchableOpacity>
                </View>
                {hidden[item.key-1]?<Text style={[{fontSize:18, fontWeight: 'bold'},{color:'#000'}]}>FeedBack: {item.feedback}</Text>:<></>}
                {hidden[item.key-1]?<Text style={[{fontSize:18, fontWeight: 'bold'},{color:'#000'}]}>Date: {item.date}</Text>:<></>}
                {hidden[item.key-1]?<TouchableOpacity onPress={() => setmodalopen(true)}>
                    <Text style= {[styles.buttons , {textAlign: 'center', color: '#c0c0c0'}]}>Reply</Text>
                </TouchableOpacity>:<></>}

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