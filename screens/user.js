import React, {useState, useEffect} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet, 
    ActivityIndicator,
    ImageBackground
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './loading';


export default function User({navigation}){
    const [dark, setDark]=useState(false);
    const [balance, setBalance]=useState('');
    //const [userData, setuserData]=useState({});
    const [loading, setLoading]=useState(true);
    
    useEffect(()=>{
        async function getDark(){
            const read=await AsyncStorage.getItem('darkMode');
            if(read!=null){
                setDark(JSON.parse(read));
            }
            setLoading(false);
        }
        setLoading(true);
        getDark();
        
    });
    
    const darkColors=[
        '#1e2127',
        '#000',
        '#1e2127'
    ];
    const lightColors=[
        '#978282',
        '#978282',
        '#d8cfc4',
        '#d8cfc4',
    ];

    useEffect(()=>{
        async function getData(){
            console.log(loading);
            const user = await firestore().collection('AccountData').doc(auth().currentUser.email).get();
            //setuserData(user.data());
            setBalance(user.data().balance);
        }
        setLoading(true);
        getData();
        setLoading(false);
    }, [loading]);

    function signOut(){
        if(loading){
            return;
        }
        auth().signOut()
        .then(()=>navigation.goBack());
    }

    function styles(){
        if(dark){
            return stylesDark;
        }
        return stylesLight;
    }

    async function handleDark(){
        setDark(!dark);
        await AsyncStorage.setItem('darkMode', JSON.stringify(!dark));
    }
        
    return(
        <View style={styles().container}>
            <LinearGradient style={styles().center} colors={dark?darkColors:lightColors}>
                <View style={styles().card}>
                    <ImageBackground source={dark?require('../assets/dark.png'):require('../assets/light.jpg')} style={{width:'100%', height:'100%',elevation:10}} imageStyle={{ borderWidth:2,borderColor:'maroon',borderRadius: 10}} >
                        <View style={{flex:1, padding:10, justifyContent:'center',alignItems:'center'}}>
                            <Loader animating={loading} />
                            <Image source={dark?require('../assets/designing/logocard.png'):require('../assets/designing/logocardL.png')} style={{width:85,height:25 ,position:'absolute',top:10,left:10,}}/>
                            <Text style={[styles().cardtext, {fontSize:55}]}>{balance}<Text style={[styles().cardtext, {fontSize:30}]}> Rs</Text></Text>
                            <Text style={[styles().cardtext, {fontSize:12, position:'absolute', bottom:10, left:10,}]}>{auth().currentUser.email}</Text>
                            <Image source={require('../assets/visa.png')} style={{width:40,height:40,position:'absolute',bottom:10,right:10,alignSelf:'flex-end'}}/>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles().row}>
                    <TouchableOpacity style={styles().btn}>
                        <Image source={require('../assets/mobile-payment.png')} style={{width:50,height:60, opacity:0.8}}/>
                        <Text style={[styles().text, {textAlign:'center', paddingTop:10}]}>Funds Transfer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles().btn}>
                        <Image source={require('../assets/bill.png')} style={{width:50,height:60, opacity:0.8}}/>
                        <Text style={[styles().text, {textAlign:'center', paddingTop:10}]}>Pay Bills</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles().row}>
                    <TouchableOpacity style={styles().btn}>
                       <Image source={require('../assets/bank-statement.png')} style={{width:50,height:60, opacity:0.8}}/>
                       <Text style={[styles().text, {textAlign:'center', paddingTop:10}]}>Account Statement</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles().btn} onPress={()=>{setLoading(true);handleDark(); setLoading(false)}}>
                        <Image source={require('../assets/settings.png')} style={{width:50,height:60, opacity:0.8}} />
                        <Text style={[styles().text, {textAlign:'center', paddingTop:10}]}>Settings</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <LinearGradient
                colors={dark?['#14062E', '#100010', '#841851', '#100010','#14062E' ]:['#841b2d', '#be0032', '#841b2d']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles().bottom}
            >
                <TouchableOpacity style={{flex:1,  justifyContent:'space-between', alignItems:'center'}}onPress={()=>{if(!loading)navigation.navigate('ContactUs')}}>
                    {/*<Image source={require('../assets/contact.png')} style={{width:50,height:50, opacity:0.8}}/>*/}
                    <Icon name="address-card" size={30} color={dark?"#801818":"#d8cfc4"} />
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1,  justifyContent:'space-between', alignItems:'center'}} onPress={()=>{if(!loading)navigation.navigate('Notifications')}}>
                    {/*<Image source={require('../assets/notification.png')} style={{width:50,height:50, opacity:0.8}}/>*/}
                    <Icon name="bell" size={30} color={dark?"#801818":"#d8cfc4"}  />
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1,  justifyContent:'space-between', alignItems:'center'}} onPress={()=>{if(!loading)navigation.navigate('FAQ')}}>
                    {/*<Image source={require('../assets/FAQ.png')} style={{width:50,height:50, opacity:0.8}}/>*/}
                    <Icon name="question-circle" size={30} color={dark?"#801818":"#d8cfc4"}  />
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1,  justifyContent:'space-between', alignItems:'center'}} onPress={signOut}>
                    {/*<Image source={require('../assets/signout.png')} style={{width:50,height:50, opacity:0.8}}/>*/}
                    <Icon name="sign-out" size={30} color={dark?"#801818":"#d8cfc4"}  />
                </TouchableOpacity>

            </LinearGradient>
        </View>
    );
}

const stylesLight=StyleSheet.create({
    container:{
        flex:1,
    },
    center:{
        flex:10,
        backgroundColor:'#21252b',
        alignItems:'center',
    },
    bottom:{
        flex:1,
        flexDirection:'row',
        borderColor:'#801818',
        borderTopWidth:4,
        backgroundColor:'#801818',
        justifyContent:'space-between',
        alignItems:'center',
    },
    row:{
        flex:1,
        flexDirection:'row',
    },
    btn:{
        flex:1,
        margin:'7%',
        borderRadius:10,
        padding:5,
        justifyContent:'center',
        alignItems:'center',
    },
    card:{
        marginTop:'12%',
        marginBottom:'5%',
        width:'80%',
        backgroundColor:'#cfd6e0',
        flex:1.2,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        border:3,
        borderColor:'#ff8c00'
        
    },
    text:{
        fontFamily:'Baskerville',
        fontSize:18,
        color:'#801818',
        fontWeight:'bold',
    },
    cardtext:{
        color:'#801818',
        fontWeight:'bold',

    }
});

const stylesDark=StyleSheet.create({
    container:{
        flex:1,
    },
    center:{
        flex:10,
        backgroundColor:'#21252b',
        alignItems:'center',
    },
    bottom:{
        flex:1,
        flexDirection:'row',
        borderColor:'#00008b',
        borderTopWidth:4,
        backgroundColor:'#88194E',
        justifyContent:'space-between',
        alignItems:'center',
    },
    row:{
        flex:1,
        flexDirection:'row',
    },
    btn:{
        flex:1,
        margin:'7%',
        borderRadius:10,
        padding:5,
        //borderColor:'#c0c0c0',
        //borderWidth:2,
        justifyContent:'center',
        alignItems:'center',
      
    },
    card:{
        marginTop:'12%',
        marginBottom:'5%',
        width:'80%',
        backgroundColor:'#cfd6e0',
        flex:1.2,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        border:3,
        borderColor:'#ff8c00'
        
    },
    text:{
        fontFamily:'Baskerville',
        fontSize:18,
        color:'#c0c0c0',
        fontWeight:'bold',
    },
    cardtext:{
        color:'#c0c0c0',
         fontWeight:'bold'
    }

});