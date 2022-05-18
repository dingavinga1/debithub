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

export default function Notifications({navigation}){
    const [which, setWhich]=useState("All");
    
    const [all, setAll]=useState([]);
     
    const [notifications, setNotifications]=useState([]);
    const [feedback, setFeedback]=useState([]);
    const [promo, setPromo]=useState([]);

    const [open, setOpen]=useState(false);

    const [loading, setLoading]=useState(false);

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

    function styles(){
        if(dark){
            return stylesDark;
        }
        return stylesLight;
    }

    function handleToggle(item, index){
        index===0?setWhich('Promotions'):index===1?setWhich('Feedback'):index===2?setWhich('Bank'):setWhich('All');
        setOpen(false);
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
            <View style={[{flex:1, justifyContent:'center', alignItems:'center'}, styles().container]}>
                <View style={{flex:1, width:'100%'}}>
                    <FlatList
                        contentContainerStyle={{paddingHorizontal:10,}}
                        data={which=='All'?all:which=='Bank'?notifications:which=='Feedback'?feedback:promo}
                        renderItem={({item})=>
                            {
                                if(!item.hasOwnProperty('question')){
                                    return(
                                        <View style={[styles().item, {width:'100%'}]}>
                                            <Text style={[styles().text, {fontWeight:'normal'}]}>{item.data}</Text>
                                        </View>
                                    );
                                }else{
                                    return(
                                        <View style={[styles().item, {width:'100%'}]}>
                                            <Text style={[styles().text, {fontWeight:'bold'}]}>You: {item.question}</Text>
                                            <Text style={[styles().text, {fontWeight:'normal'}]}>{item.answer}</Text>
                                        </View>
                                    );
                                }
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