import React, { Component } from 'react';
import {Text, View, StyleSheet, Image, ImageBackground} from 'react-native';

export default class Flash extends Component {
    constructor(props){
        super(props);
        setTimeout(()=> this.props.navigation.navigate('Join'), 3000 );
    }
    render() {
        return (
            <View style={styleCss.mother}>
                <Image
                style={styleCss.image}
                source={require('../images/chaticon.png')}>
                </Image>
                <Text style={styleCss.text}>
                    SHARE YOUR STORY!
                </Text>
            </View>
        )
    }

}
const styleCss = StyleSheet.create({
    mother: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'indigo'
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 20,
        marginBottom: 30
    },
    text: {
        fontFamily: 'sans-serif',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 20
    }
});
