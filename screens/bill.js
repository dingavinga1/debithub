import { Text, View, FlatList, StyleSheet, TouchableOpacity, TextInput,KeyboardAvoidingView } from 'react-native'
import React, {useState, useEffect} from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PayBills() {
    const [dark, setDark]=useState(false);

    useEffect(()=>{
        async function getDark(){
            const read=await AsyncStorage.getItem('darkMode');
            if(read!=null){
                setDark(JSON.parse(read));
            }
        }
        getDark();
    });

    function styles(){
        if(dark){
            return stylesDark;
        }
        return stylesLight;
    }
    const [beneficiary, setBeneficiary] =useState(' ');
    const [billID, setBillID]=useState(' ');
    const [amount, setAmount]=useState(' ');
    const [error, setError]=useState(' ');
    const [toggle, setToggle]=useState(false);
    const [hidden, setHidden]=useState(false);

    function toggleAns(){
        let x=hidden;
        x=!x;
        setHidden(x);
    }
   
    return (
        <KeyboardAvoidingView
            style={{flexGrow:1}}
            behavior='height'
            keyboardVerticalOffset={10}
        >
        <View style={{flex:1}}>
            <View style={[styles().top,{flex:1}]}></View>
            <View style={[styles().top,{flex:1}]}>
                    <Text style={[styles().text, {fontWeight:'bold', fontSize:30}]}>BILL PAYMENT</Text>
            </View>
            <View style={[styles().top,{flex:2}]}></View>
            <View style={[styles().top,{flex:10}]}>

                <View style={styles().input}>
                    <View style = {{flex:1,flexDirection:'row',justifyContent:'center'}} >
                    <Text style={[styles().text, {marginTop:3,flex:9,fontWeight:'normal',fontSize:14}]}>
                        {beneficiary===' '?'Biller...':beneficiary}
                    </Text>  
                    <TouchableOpacity disabled={false} style={{flex:1}} onPress={()=>toggleAns()}>
                        <Text style={[{fontSize:25,fontWeight:'bold'}, dark?{color:'silver'}:{color:'#801818'}]}>{!hidden?"\u{25BC}":"\u{25B2}"}</Text>
                    </TouchableOpacity>  
                    </View> 
                </View>
                {hidden?<View style={{marginLeft:75,width:'100%'}} >
                        <TouchableOpacity style={[styles().menu,{align:'left'}]} onPress={()=>setBeneficiary('Nayatel')} >
                        <Text style={[{fontSize:14},dark?{color:'white'}:{color:'#801818'}]}>Nayatel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles().menu,{align:'left'}]} onPress={()=>setBeneficiary('IESCO')}>
                        <Text style={[{fontSize:14},dark?{color:'white'}:{color:'#801818'}]}>IESCO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles().menu,{align:'left'}]} onPress={()=>setBeneficiary('PTCL')}>
                        <Text style={[{fontSize:14},dark?{color:'white'}:{color:'#801818'}]}>PTCL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles().menu,{align:'left'}]} onPress={()=>setBeneficiary('Jazz')}>
                        <Text style={[{fontSize:14},dark?{color:'white'}:{color:'#801818'}]}>Jazz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles().menu]} onPress={()=>setBeneficiary('Ufone')}>
                        <Text style={[{fontSize:14},dark?{color:'white'}:{color:'#801818'}]}>Ufone</Text>
                        </TouchableOpacity>
                        <TextInput
                            placeholder="Other..."
                            style={[styles().menu,{paddingVertical:0,color:'white'}]}
                            placeholderTextColor={dark?"white":"black"}
                            onChangeText={setBeneficiary}
                        >
                        </TextInput>
                        
                        
                    </View>:<></>}     
               
                <TextInput
                    placeholder="Bill ID..."
                    style={styles().input}
                    textAlignVertical="top"
                    placeholderTextColor={dark?"white":"black"}
                    onChangeText={setBillID}
                >
                </TextInput>
                <TextInput
                    placeholder="Payment Amount..."
                    style={styles().input}
                    textAlignVertical="top"
                    placeholderTextColor={dark?"white":"black"}
                    onChangeText={setAmount}
                >
                </TextInput>
                <TouchableOpacity
                    //if billID is valid && amount is enough
                    //onPress={sendFeedback}
                    style={styles().btn}
                >
                    <Text style={[styles().text, {fontWeight:'bold', fontSize:18}, !dark?{color:'white'}:{}]}>Proceed</Text>
                </TouchableOpacity>
            </View>
        </View>
        </KeyboardAvoidingView>
    )
}


const stylesDark=StyleSheet.create({
    top:{
      
        alignItems:'center',
        flex:8,
        backgroundColor:'#1e2127',
    },
    menu:{
        borderBottomWidth:2,
        borderColor:'#841851',
        borderRadius:4,
        width:'80%',
        marginVertical:5,
        backgroundColor:'#1e2127',
        paddingHorizontal:10,
 
    },
  
    text:{
        
        fontSize:25,
        color:'white',
    },
    input:{
        width:'80%',
        height:'8%',
        borderWidth:3,
        borderRadius:15,
        borderColor:'#841851',
        backgroundColor:'#2e3137',
        justifyContent:"space-between",
        color:'silver',   
        marginVertical:10,
        paddingHorizontal:10
       
    },
    btn:{
        backgroundColor:'#841851',
        borderRadius:12,
        alignItems:'center',
        width:'40%',
        padding:10,
        marginTop:40
    }
});

const stylesLight=StyleSheet.create({
    top:{
        justifyContent:'center',
        alignItems:'center',
        flex:8,
        backgroundColor:'#d8cfc4',
    },
    menu:{
        borderBottomWidth:2,
        borderColor:'#801818',
        borderRadius:4,
        width:'80%',
        marginVertical:5,
        backgroundColor:'#d8cfc4',
        paddingHorizontal:10,
 
    },
    text:{
        fontSize:25,
        color:'black',
    },
    input:{
        width:'80%',
        height:'10%',
        borderWidth:3,
        borderRadius:15,
        borderColor:'#801818',
        backgroundColor:'#A79292',
        justifyContent:"space-between",
        color:'black',
        marginVertical:10,
        paddingHorizontal:10
    },
    btn:{
        backgroundColor:'#801818',
        borderRadius:12,
        alignItems:'center',
        width:'40%',
        padding:10,
    }
});