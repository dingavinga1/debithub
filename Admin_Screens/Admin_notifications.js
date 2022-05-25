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

export default function Admin_Notifications({navigation}){
    const [which, setWhich]=useState("All");

    const [type, settype] = useState("");
    const [newnotes, setnewnotes]=useState("");

    const [modalopen, setmodalopen] = useState(false);

    const [Username, setusername] = useState("");

    const [password, setpassword] = useState("");

    const [all, setAll]=useState([]);
     
    const [notifications, setNotifications]=useState([]);

    const [feedback, setFeedback]=useState([]);

    const [promo, setPromo]=useState([]);

    const [open, setOpen]=useState(false);

    const [loading, setLoading]=useState(false);

    async function getData(){
        const temp=[];
        const temp2=[];
        const temp3=[];
        const tAll=[];
        const subscriber=await firestore()
        .collection('Admin').doc('Notifications').get().then(doc=>{
            const data=doc.data();
            const length=data.notifications.length;
            let j=0;
            for(let i=0; i<length; i++){
                temp.push({key:i, data:data.notifications[i], type:'Bank'});
                tAll.push({key:j, data:data.notifications[i], type:'Bank'});
                j++;
            }
            const length2=data.Promotions.length;
            for(let i=0; i<length2; i++){
                temp2.push({key:i, data:data.Promotions[i], type:'Promotions'});
                tAll.push({key:j, data:data.Promotions[i], type:'Promotions'});
                j++;
            }
            const length3=data.Feedback.length;
            for(let i=0; i<length3; i++){
                if(data.Feedback[i].user===auth().currentUser.email){
                    temp3.push({key:i, question:data.Feedback[i].Question, answer:data.Feedback[i].Answer, type:'Feedback'});
                    tAll.push({key:j, question:data.Feedback[i].Question, answer:data.Feedback[i].Answer, type:'Feedback'});
                    j++;
                }
            }
        });
        setLoading(false);
        setNotifications(temp);
        setPromo(temp2);
        setFeedback(temp3);
        setAll(tAll);
    }

    useEffect(()=>{
        setLoading(true);
        
        getData();
    }, []);

    function handleToggle(item, index){
        index===0?setWhich('Promotions'):index===1?setWhich('Feedback'):index===2?setWhich('Bank'):setWhich('All');
        setOpen(false);
    }

    function sendfeedback(){

    }

    function handlemodal(){
        setmodalopen(false);
    }

    
    const items=[
        {label:'All'},
        {label:'Bank'},
        {label:'Feedback'},
        {label:'Promotions'},
    ]

    return(
        
        <GestureRecognizer                   
        onSwipeDown={(e)=>{
            setLoading(true);
            getData();
        }}
        style={{flex:1}}
    >
        <LinearGradient colors={['#1e2127','#000','#1e2127']} style={[{flex:8, justifyContent:'center', alignItems:'center'}, { backgroundColor:'#d8cfc4',flex:1}]}>
       
            <Modal visible = {modalopen} animationType = 'slide' transparent = {true}>
            <View style= {{flex: 1,justifyContent: 'flex-end'}}>
            <View style={{opacity: .9, backgroundColor: 'black', height: '80%', borderTopLeftRadius: 40,borderTopRightRadius: 40,borderTopColor: '#c0c0c0',borderLeftColor: '#c0c0c0',borderRightColor: '#c0c0c0', borderTopWidth: 4, borderLeftWidth: 4, borderRightWidth: 4, }}>
                
                <TextInput
                    placeholder="Enter Notification Type..."
                    style={[styles.notification_input, {height: '10%'}]}
                    textAlignVertical="top"
                    placeholderTextColor={"#c0c0c0"}
                    onChangeText={settype}
                ></TextInput>
                 <TextInput
                    placeholder="Add New Notification..."
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
            
            <View style={{flex:1, width:'100%'}}>
                    
                <FlatList
                    contentContainerStyle={{paddingHorizontal:10, padding: 10}}
                    data={which=='All'?all:which=='Bank'?notifications:which=='Feedback'?feedback:promo}
                    renderItem={({item})=>
                        {
                            if(!item.hasOwnProperty('question')){
                                return(
                                    
                                    <View style={[{ width:'100%',marginTop:10,borderRadius:15,paddingVertical:15,backgroundColor:'#841851',}, {width:'100%'}]}>
                                         
                                        <Text style={[{fontSize:20,color:'silver', padding: 10}, {fontWeight:'normal'}]}>{item.data}</Text>
                                    </View>
                                );
                            }else{
                                return(
                                    <View style={[{ width:'100%',marginTop:10,borderRadius:15,paddingVertical:15,backgroundColor:'#841851',}, {width:'100%'}]}>
                                        <Text style={[{fontSize:20,color:'silver'}, {fontWeight:'bold'}]}>You: {item.question}</Text>
                                        <Text style={[{fontSize:20,color:'silver'}, {fontWeight:'normal'}]}>{item.answer}</Text>
                                    </View>
                                );
                            }
                        }
                    }
                />
            </View>
            <Loader animating={loading} />
            <TouchableOpacity onPress={() => setmodalopen(true)} style = {{marginLeft: 170, position: 'absolute', right: 15, bottom: 124}}>
                    <Icon name="plus" size={50} color="#c0c0c0" style ={styles.adder} />
                    </TouchableOpacity>
            <FloatingMenu
                isOpen={open}
                items={items}
                onMenuToggle={isMenuOpen=>setOpen(isMenuOpen)}
                onItemPress={handleToggle}
                right={15}
                bottom={62}
                backgroundUpColor={'#841851'}
                primaryColor={'#fff'}
                borderColor='transparent'
                backgroundDownColor={'#841851'}
                buttonWidth={50}
                innerWidth={50}
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
                
                  <TouchableOpacity onPress={() => Alert.alert("Button Pressed")}>
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
    </GestureRecognizer>   
    );
}