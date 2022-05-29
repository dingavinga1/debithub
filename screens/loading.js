import React from 'react';
import {
    View, 
    Text, 
    ActivityIndicator, 
    Image
} from 'react-native';

import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient';

export default function Loader(props){
        const darkColors=[
            '#000',
            '#231F20',
            '#1e2127',
            '#000',
            '#231F20',
            '#1e2127'
        ];
    const lightColors=[
        '#978282',
        '#d8cfc4',
        '#978282',
        '#d8cfc4',
        '#978282',
        '#d8cfc4'
    ];

    if(props.animating){
        return(
            <View style={[{position:'absolute', top:'40%',left:'38%', right:'50%', width:100, height:40, borderRadius:50, elevated:10, overflow:'hidden', elevation:10, zIndex:1000}]}>
            <AnimatedLinearGradient 
                customColors={presetColors.instagram}
                speed={7000}
            >
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Image source={require('../assets/designing/logo.png')} style={{resizeMode:'cover', width:80, height:20}} />
                </View>
            </AnimatedLinearGradient>
            
            </View>
        );
    }
    else return <></>
}