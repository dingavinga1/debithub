
import { Text, } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
export default function Contact() {
    return(
        <LinearGradient style={{flex:1}} colors={[ '#000','#00008c','#b22222']}>
            <Text>
                Basic Linear Gradient Syntax
            </Text>
        </LinearGradient>


    )
}