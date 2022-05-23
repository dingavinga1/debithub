import React, {useState} from 'react';
import {
  Text,
  View,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
} from 'react-native';

import {styles} from '../Styles/StyleSheet';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';

export default function Admin_Notifications({navigation}){
    return(
        <LinearGradient colors={['#780206', '#061161' ]} style={{flex: 1, justifyContent: 'center'}}>
            <Text>Add Notifications and Feedback Reply</Text>
        </LinearGradient>
    );
}