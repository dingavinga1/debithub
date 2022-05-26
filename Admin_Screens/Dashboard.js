import React, {useState} from 'react';

import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from 'react-native';

import { styles } from '../Styles/StyleSheet';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LineChart } from 'react-native-chart-kit';
import { NavigationContainer } from '@react-navigation/native';
import { VictoryBar, VictoryChart, VictoryGroup } from 'victory-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function Dashboard({navigation}) {
  
  const [set, setSet]=useState(false);
  const [modalopen, setmodalopen] = useState(false);
  
  const line = {
    labels: ['Dinga', 'Aisha', 'Usman', 'huzaifi', 'Musab', 'Ismail', 'Shani'],
    datasets: [
      {
        data: [20, 40, 25, 50, 90, 40, 20],
        strokeWidth: 2, // optional
      },
    ],
  };
  
  const graph = () => {
    setSet(!set);
  }
  function handlemodal(){
    setmodalopen(false);
  }
    
  return(
      <View style={styles.container2}>
        <LinearGradient colors={[ '#1e2127','#000','#1e2127']} style={{flex: 1, justifyContent: 'center'}}>          
              
        <Modal visible = {modalopen} animationType = 'slide' transparent = {true}>
            <View style= {{flex: 1,justifyContent: 'flex-end'}}>
            <View style={{opacity: .88, backgroundColor: 'black', height: '100%' }}>
                
            <ImageBackground source={require('../assets/light.jpg')} style={{width:360, height:200,elevation:10}} imageStyle = {{borderWidth: 2, borderColor: 'darkred'}} >
                        <Image source={require('../assets/designing/logocardL.png')} style={{width:100,height:40,position: 'absolute',bottom:160,left:10,alignSelf:'flex-end'}}/>
                        <Text style={[{color:'#000',fontWeight:'bold'}, {fontSize:17, position:'absolute', bottom:5, left:10,}]}>{auth().currentUser.email}</Text>
                        <Text style={[{color:'darkred',fontWeight:'bold', textAlign: 'center', fontFamily: 'times new roman'}, {fontSize:32, position:'absolute', bottom:80, left:120,}]}>Admin</Text>
                        <Image source={require('../assets/visa.png')} style={{width:40,height:40,position:'absolute',bottom:5,right:10,alignSelf:'flex-end'}}/>
            </ImageBackground>

            <TouchableOpacity onPress={() => handlemodal()} style = {{ marginTop: 5 , backgroundColor: '#841851', borderBottomColor: 'maroon', borderWidth: 2, opacity: 0.7}}>
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

            <TouchableOpacity onPress={() => {navigation.navigate('Settings'), handlemodal()}} style = {{ marginTop: 5 , backgroundColor: '#841851', borderBottomColor: 'maroon', borderWidth: 2, opacity: 0.7}}>
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
              <View style={{flex: 8, justifyContent: 'center'}}>
                
                <View style={{flex: 4, justifyContent: 'center'}}>
                  <TouchableOpacity style={{elevation: 10, shadowColor: '#fff'}}onPress={() => graph()}>
                    {set?
                    <View>
                      <LineChart
                        data={line}
                        width={340} // from react-native
                        height={200}
                        //yAxisLabel={'$'}
                        chartConfig={{
                          backgroundColor: '#000',
                          backgroundGradientFrom: '#780206',
                          backgroundGradientTo: '#061161',
                          borderColor: '#fff',
                          borderwidth: 4,
                          position: 'absolute',
                          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                          style: {
                            borderRadius: 0,
                            borderwidth: 2,
                            borderColor: '#ff8c00',
                            position: 'absolute',
                          }
                        }}
                        bezier
                        style={{
                          marginVertical: 8,
                          borderRadius: 10,
                          marginLeft: 28,
                          marginRight: 28,
                        }}
                      />
                      
                    </View>:
                    <ImageBackground source={require('../assets/mycard.jpg')} style={{width:'90%', height:'85%',elevation:10, marginleft: 30}} imageStyle={{ borderWidth:2,borderColor:'maroon',borderRadius: 10, marginLeft: 40, marginRight: 30, marginTop: 20}} >
                        <Image source={require('../assets/designing/logocardL.png')} style={{width:100,height:40,position:'absolute',bottom:190,left:40,alignSelf:'flex-end'}}/>
                        <Text style={[{color:'#c0c0c0',fontWeight:'bold'}, {fontSize:17, position:'absolute', bottom:30, left:50,}]}>{auth().currentUser.email}</Text>
                        <Text style={[{color:'darkred',fontWeight:'bold', textAlign: 'center', fontFamily: 'times new roman'}, {fontSize:32, position:'absolute', bottom:110, left:100,}]}>Admin</Text>
                        <Image source={require('../assets/visa.png')} style={{width:40,height:40,position:'absolute',bottom:25,right:10,alignSelf:'flex-end'}}/>
                    </ImageBackground>}
                        <Text style={{color: 'white', textAlign: 'center', fontSize: 15}}>▶ Click Card for User Activity</Text>
                  </TouchableOpacity>
                </View>

                <View style={{flex: 4, justifyContent: 'center'}}>
                    
                    <View style={{flex: 2, padding: 10}}>
                        
                        <View style={{flexDirection: 'row'}}>
                          
                          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10}}>
                          
                          <TouchableOpacity onPress={() => navigation.navigate('Display')}>
                              <Icon name="users" size={40} color="#801818"/>
                          </TouchableOpacity>
                            <Text style={{color: 'white', textAlign: 'center',fontWeight: 'bold', fontSize: 15}}>Display All Users</Text>
                        
                        </View>

                          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10}}>
                          
                            <TouchableOpacity onPress={() => navigation.navigate('Admin_Notifications')}>
                                <Icon name="bell" size={40} color="#801818"/>
                            </TouchableOpacity>
                              <Text style={{color: 'white', textAlign: 'center',fontWeight: 'bold', fontSize: 15}}>Add Notifications</Text>
                          
                          </View>
                        
                        </View>
                    </View>
                  <View style={{flex: 2, padding: 10}}>
                    
                    <View style={{flexDirection: 'row'}}>
                        
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10}}>
                          
                          <TouchableOpacity onPress={() => navigation.navigate('Feedback')}>
                              <Icon name="address-card" size={40} color="#801818"/>
                          </TouchableOpacity>
                            <Text style={{color: 'white', textAlign: 'center',fontWeight: 'bold', fontSize: 15}}>Feedback Reply</Text>
                        
                        </View>

                       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10}}>
                          
                          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                              <Icon name="gears" size={40} color="#801818"/>
                          </TouchableOpacity>
                            <Text style={{color: 'white', textAlign: 'center',fontWeight: 'bold', fontSize: 15}}>Change Password</Text>
                        
                        </View>
                    
                    </View>
                  
                  </View>
                
                </View>

              </View>
              
              <LinearGradient colors={['#14062E','#100010','#841851','#100010', '#14062E' ]}  start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }} style={{flexDirection: 'row',borderColor:'#00008b',borderTopWidth:4,}}>
                
                <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                  
                  <TouchableOpacity onPress={() => Alert.alert("Already on Dashboard")}>
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
      </View> 
    );
}