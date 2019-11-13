import React, { Component } from 'react'
import {Text, StyleSheet, View, TextInput, TouchableOpacity, Image, BackHandler, Alert} from 'react-native'
import {BackAndroid} from 'react-native'
import firebase from 'firebase';
console.disableYellowBox=true;
export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmpass: ''
        } 
    }
    componentWillMount() {
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
}
    Register = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password)
        .then(data => {
            Alert.alert('CONFIRM', 'Account is created');
            this.props.navigation.navigate('Join');

        })
        .catch(e => {
            Alert.alert('ERROR', 'Your Account has been created!');
        });
    }
    ExitApp(){
        this.props.navigation.navigate('Home');
    }
    render() {
        return (
            <View style={styles.global}>
                <Image style={styles.image}
                source={require('../images/registericon.png')}>
                </Image>
                <TextInput
                style={styles.textinput}
                placeholder='Enter your email'
                value={this.state.username}
                onChangeText={(text) => this.setState({username: text})}
                autoCorrect={false}
                autoFocus={true}
                keyboardType={'email-address'}>
                </TextInput>
                <TextInput
                style={styles.textinput}
                placeholder='Enter your password'
                value={this.state.password}
                onChangeText={(text) => this.setState({password: text})}
                autoCorrect={false}
                autoFocus={false}
                secureTextEntry={true}>
                </TextInput>
                <TextInput
                style={styles.textinput}
                placeholder='Confirm your password'
                value={this.state.confirmpass}
                onChangeText={(text) => this.setState({confirmpass: text})}
                autoCorrect={false}
                autoFocus={false}
                secureTextEntry={true}>
                </TextInput>
                <TouchableOpacity 
                style={styles.touchOK}
                onPress={() => {
                    if (this.state.username.length == 0 || this.state.password.length == 0 || this.state.confirmpass.length == 0 || this.state.password != this.state.confirmpass)
                        Alert.alert('WARNING','Check your information');
                    else
                        this.Register();
                }}>
                    <Text style={{fontSize: 15 , color: 'white', fontWeight: 'bold'}}>OK</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.touchCancel}
                onPress={() => this.ExitApp() }>
                    <Text style={{fontSize: 15 , color: 'white', fontWeight: 'bold'}}>CANCEL</Text>
                </TouchableOpacity>
            </View>
        )
    }
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
    }
});
