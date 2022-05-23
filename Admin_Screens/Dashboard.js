import React, {useState} from 'react';

import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { styles } from '../Styles/StyleSheet';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LineChart } from 'react-native-chart-kit';
import { NavigationContainer } from '@react-navigation/native';
import { VictoryBar, VictoryChart, VictoryGroup } from 'victory-native';

const Stack = createNativeStackNavigator();

export default function Dashboard({navigation}) {
  
  const [set, setSet]=useState(false);
  
  const line = {
    labels: ['Abdullah', 'Aisha', 'Usman', 'Musab', 'Ismail', 'Huzaifa'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        strokeWidth: 2, // optional
      },
    ],
  };
  
  const graph = () => {
    setSet(!set);
  }
    
  return(
      <View style={styles.container2}>
        <LinearGradient colors={['#780206', '#061161' ]} style={{flex: 1, justifyContent: 'center'}}>
            <Text style = {styles.header}> Admin Panel</Text>
          
              <View style={{flex: 8, justifyContent: 'center'}}>
                
                <View style={{flex: 4, justifyContent: 'center'}}>
                  <TouchableOpacity style={{elevation: 10, shadowColor: '#fff'}}onPress={() => graph()}>
                    {set?
                    <View>
                      <LineChart
                        data={line}
                        width={360} // from react-native
                        height={200}
                        //yAxisLabel={'$'}
                        chartConfig={{
                          backgroundColor: '#000',
                          backgroundGradientFrom: '#780206',
                          backgroundGradientTo: '#061161',
                          borderColor: '#fff',
                          borderwidth: 4,
                          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                          style: {
                            borderRadius: 0,
                            borderwidth: 2,
                            borderColor: '#ff8c00',
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
                      <Image
                      style= {[styles.card]}
                      source= {require('../assets/bankcard2.jpg')}/>}
                        <Text style={{color: 'white', textAlign: 'center', fontSize: 15}}>▶ Click Card for User Activity</Text>

                  </TouchableOpacity>
                </View>

                <View style={{flex: 4, justifyContent: 'center'}}>
                    
                    <View style={{flex: 2, padding: 10}}>
                        
                        <View style={{flexDirection: 'row'}}>
                          
                          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10, borderRightColor: '#000'}}>
                            
                            <TouchableOpacity onPress={() => navigation.navigate('Deny Rights')}>
                              <Icon name="user-times" size={50} color="#780206"/>
                            </TouchableOpacity>
                              <Text style={{color: 'white', textAlign: 'center',fontWeight: 'bold', fontSize: 15}}>Deny Rights</Text>
                          
                          </View>
                          
                          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10}}>
                          
                            <TouchableOpacity onPress={() => navigation.navigate('Admin_Notifications')}>
                                <Icon name="bell" size={50} color="#780206"/>
                            </TouchableOpacity>
                              <Text style={{color: 'white', textAlign: 'center',fontWeight: 'bold', fontSize: 15}}>Notification</Text>
                          
                          </View>
                        
                        </View>
                    </View>
                  <View style={{flex: 2, padding: 10}}>
                    
                    <View style={{flexDirection: 'row'}}>
                        
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10}}>
                          
                          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                              <Icon name="gear" size={50} color="#780206"/>
                          </TouchableOpacity>
                            <Text style={{color: 'white', textAlign: 'center',fontWeight: 'bold', fontSize: 15}}>Settings</Text>
                        
                        </View>
                        
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10}}>
                          
                          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                              <Icon name="sign-out" size={50} color="#780206"/>
                          </TouchableOpacity>
                            <Text style={{color: 'white', textAlign: 'center',fontWeight: 'bold', fontSize: 15}}>logout</Text>
                        
                        </View>
                    
                    </View>
                  
                  </View>
                
                </View>

              </View>
              
              <View style={{flexDirection: 'row'}}>
                
                <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#780206'}}>
                  
                  <TouchableOpacity onPress={() => Alert.alert("Button Pressed")}>
                      <Icon name="home" size={30} color="#fff"/>
                      <Text style= {{textAlign: 'center', color: 'white'}}>Home</Text>
                  </TouchableOpacity>
                
                </View>

                <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#780206'}}>
                
                  <TouchableOpacity onPress={() => Alert.alert("Button Pressed")}>
                    <Icon name="user-circle-o" size={30} color="#fff" />
                    <Text style= {{textAlign: 'center', color: 'white'}}>User</Text>
                  </TouchableOpacity>
                
                </View>
                
                <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#780206'}}>
                
                  <TouchableOpacity onPress={() => Alert.alert("Button Pressed")}>
                    <Icon name="bars" size={30} color="#fff"/>
                    <Text style= {{textAlign: 'center', color: 'white'}}>Menu</Text>
                  </TouchableOpacity>
                  
                </View>
                
                <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#780206'}}>
                
                  <TouchableOpacity onPress={() => Alert.alert("Button Pressed")}>
                    <Icon name="download" size={30} color="#fff"/>
                    <Text style= {{color: 'white'}}>Download</Text>
                  </TouchableOpacity>
                  
                </View>

              </View>

        </LinearGradient>
      </View> 
    );
}