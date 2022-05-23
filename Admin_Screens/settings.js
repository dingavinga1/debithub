import React, {useState} from 'react';
import {
  Text,
  View,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';

import {styles} from '../Styles/StyleSheet';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Settings(){
    return(
        <View style={styles.container}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>Page for Settings</Text>
        </View>
    );
}