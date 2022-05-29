import React, {useState, useEffect} from 'react';
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,

} from 'react-native';

import GestureRecognizer from 'react-native-swipe-gestures';
import { FloatingMenu } from 'react-native-floating-action-menu';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from './loading'

export default function Statement() {
    const [dark, setDark]=useState(false);
    const [all, setAll]=useState([]);
    const [sent, setSent]=useState([]);
    const [recieved, setRecieved]=useState([]);
    const [which, setWhich]=useState('');
    const [open, setOpen]=useState(false);
    const [loading, setLoading]=useState(false);

    useEffect(()=>{
        async function getDark(){
            const read=await AsyncStorage.getItem('darkMode');
            if(read!=null){
                setDark(JSON.parse(read));
            }
        }
        getDark();
    });

    async function getData(){
        const temp=[];
        const temp2=[];
        const tAll=[];
        const subscriber=await firestore()
        .collection('AccountData').doc(auth().currentUser.email).get().then(doc=>{
            const data=doc.data();
            const length=data.Sent.length;
            let j=0;
            for(let i=0; i<length; i++){
                temp.push({key:i, data:data.Sent[i], type:'Sent'});
                tAll.push({key:j, data:data.Sent[i], type:'Sent'});
                j++;
            }
            const length2=data.Recieved.length;
            for(let i=0; i<length2; i++){
                temp2.push({key:i, data:data.Recieved[i], type:'Received'});
                tAll.push({key:j, data:data.Recieved[i], type:'Received'});
                j++;
            }
        });
        setLoading(false);
        setSent(temp);
        setRecieved(temp2);
       // console.log(recieved);
        setAll(tAll);
    }

    useEffect(()=>{
        setLoading(true);
        
        getData();
    }, []);


    function styles(){
        if(dark){
            return stylesDark;
        }
        return stylesLight;
    }
    function handleToggle(item, index){
        index===0?setWhich('Recieved'):index===1?setWhich('Sent'):setWhich('All');
        setOpen(false);
    }

    const items=[
        {label:'All'},
        {label:'Sent'},
        {label:'Recieved'},
    ]

    return(
        <GestureRecognizer                   
            onSwipeDown={(e)=>{
                setLoading(true);
                getData();
            }}
            style={{flex:1}}
        >
            <View style={[{flex:1, justifyContent:'center', alignItems:'center'}, styles().container]}>
                <View style={{flex:1, width:'100%'}}>
                    <FlatList
                        contentContainerStyle={{paddingHorizontal:10,}}
                        data={which=='All'?all:which=='Recieved'?recieved:sent}
                        renderItem={({item})=>
                            {
                                    return(
                                        <View style={[styles().item, {width:'100%'}]}>
                                            <Text style={[styles().text, {fontWeight:'bold',textAlign:'right'}]}>{item.data.Date}</Text>
                                            <Text style={[styles().text]}>{item.data.Bank}{'\n'}{item.data["Account Number"]}</Text>
                                            <Text style={[styles().text, {fontWeight:'normal'}]}>Rs.{item.data.Money}</Text>
                                            <Text style={[styles().text, {fontWeight:'bold',textAlign:'right'}]}>{item.type}</Text>
                                                                                     
                                        </View>
                                    );
                            }
                        }
                    />
                </View>
                <Loader animating={loading} />
            </View>
            <FloatingMenu
                isOpen={open}
                items={items}
                onMenuToggle={isMenuOpen=>setOpen(isMenuOpen)}
                onItemPress={handleToggle}
                right={15}
                bottom={15}
                backgroundUpColor={dark?'#841851':'#801818'}
                primaryColor={dark?'#fff':'#d8cfc4'}
                borderColor='transparent'
                backgroundDownColor={dark?'#841851':'#801818'}
                buttonWidth={60}
                innerWidth={60}
            />
        </GestureRecognizer>
    );

}

const stylesLight=StyleSheet.create({
    container:{
        backgroundColor:'#d8cfc4',
        flex:1
    },
    item:{
        width:'100%',
        marginTop:10,
        borderRadius:15,
        paddingVertical:15,
        backgroundColor:'#801818',
        //borderWidth:5,
        //borderColor:'#801818',
        paddingHorizontal:10
    },
    text:{
        fontSize:20,
        color:'#d8cfc4',
        flex:10
    }
})
const stylesDark=StyleSheet.create({
    container:{
        backgroundColor:'#1e2127',
        flex:1
    },
    item:{
        width:'100%',
        marginTop:10,
        borderRadius:15,
        paddingVertical:15,
        backgroundColor:'#841851',
        //borderWidth:5,
        //borderColor:'#801818',
        paddingHorizontal:10
    },
    text:{
        fontSize:20,
        color:'silver'
    }
})