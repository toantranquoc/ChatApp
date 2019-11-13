import React, { Component, useState, useEffect, useRef} from 'react'
import {Text, StyleSheet, View, TextInput, TouchableOpacity, Image, BackHandler, Alert} from 'react-native'
import {BackAndroid} from 'react-native';
import firebase from 'firebase';
import {useDispatch} from 'react-redux';
console.disableYellowBox=true;
export default function JoinChat({navigation}) {
    const dispatch = useDispatch();
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp({
              apiKey: "AIzaSyDNbfTB5_lDPjJL52fH0HljNOOj8K7Gsig",
              authDomain: "chatappfirebase-1a385.firebaseapp.com",
              databaseURL: "https://chatappfirebase-1a385.firebaseio.com",
              projectId: "chatappfirebase-1a385",
              storageBucket: "chatappfirebase-1a385.appspot.com",
              messagingSenderId: "400094575738",
              appId: "1:400094575738:web:d13a5dd29c9fe8d2cccfc3",
              measurementId: "G-PBNS34JFHV"
            });
    }
}, []);
    const LoginChat = () => {
        firebase.auth().signInWithEmailAndPassword(userName, passWord)
        .then(data => {
            dispatch({type: 'server/join', data: userName});
            navigation.navigate('App');
        })
        .catch(e => {
            Alert.alert('ERROR', e.toString());
        });

    }
    const Register = () => {
        navigation.navigate('Register');
    }
    const ExitApp = () => {
        BackHandler.exitApp()
    }
        return (
            <View style={styles.global}>
                <Image style={styles.image}
                source={require('../images/loginchaticon.png')}>
                </Image>
                <TextInput
                style={styles.textinput}
                placeholder='Enter your email'
                value={userName}
                onChangeText={(text) => setUserName(text)}
                autoCorrect={false}
                autoFocus={true}
                keyboardType={'email-address'}>
                </TextInput>
                <TextInput
                style={styles.textinput}
                placeholder='Enter your password'
                value={passWord}
                onChangeText={(text) => setPassWord(text)}
                autoCorrect={false}
                autoFocus={false}
                secureTextEntry={true}>
                </TextInput>
                <TouchableOpacity 
                style={styles.touchOK}
                onPress={() => {
                    if (userName == 0 || passWord == 0)
                        Alert.alert('WARNING','Please enter your username');
                    else
                        LoginChat();
                }}>
                    <Text style={{fontSize: 15 , color: 'white', fontWeight: 'bold'}}>OK</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.touchCancel}
                onPress={() => ExitApp() }>
                    <Text style={{fontSize: 15 , color: 'white', fontWeight: 'bold'}}>CANCEL</Text>
                </TouchableOpacity>
                <Text style={{fontSize: 20, marginBottom: 10}}> ────────  Or ────────</Text>
                <TouchableOpacity 
                style={styles.touchRegister}
                onPress={() => Register() }>
                    <Text style={{fontSize: 15 , color: 'white', fontWeight: 'bold'}}>CREATE NEW ACCOUNT</Text>
                </TouchableOpacity>
            </View>
        )
    }
const styles = StyleSheet.create({
    global: {
        flex: 1,
        backgroundColor: 'lavenderblush',
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        fontWeight: "bold",
        fontFamily: 'Times New Roman',
        fontSize: 25
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 30,
        marginBottom: 30
    },
    textinput:{
        color: 'black',
        height: 50,
        borderBottomWidth: 1,
        width: '80%',
        fontSize: 20,
        fontFamily: 'Arial',
        marginBottom: 20,
        padding: 5
    },
    touchOK: {
        borderWidth: 1,
        width: '80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        borderRadius: 30,
        marginBottom: 10
    },
    touchCancel: {
        borderWidth: 1,
        width: '80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 30,
        marginBottom: 10
    },
    touchRegister: {
        borderWidth: 1,
        width: '80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'aqua',
        borderRadius: 30,
        marginBottom: 10
    }
});
