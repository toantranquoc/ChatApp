import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux'; // to get Redux state in functional component
import { FlatList } from 'react-native-gesture-handler';
OnlineUser.navigationOptions = screenProps => ({
    title: 'User Online',
    headerTitleStyle: {
        fontWeight: 'bold',
        color: 'blue',
        alignItems: 'center',
        justifyContent: 'center'
      },
  });
export default function OnlineUser ({navigation}) {
    const onUser = useSelector(state => state.usersOnline);
    return(
        <View style={{flex:1, backgroundColor: 'darkcyan'}}>
        {/* <Text style={{fontFamily: 'Times New Roman', fontSize:25, textAlign: 'center', marginTop: 20, color: 'white', fontWeight: 'bold'}}>Online User</Text> */}
         <FlatList
         data={onUser}
         renderItem={({item}) => {
             return(
            <TouchableOpacity onPress={() => {
                navigation.navigate('Chat', {name: item.username, userid: item.userId});
            }}>
            <View style={{flex: 1, flexDirection: 'row', marginTop: 30, marginBottom: 10, marginLeft: 40, marginRight: 40, borderRadius: 30, borderBottomColor: 'black', borderBottomWidth: 1, backgroundColor:'aqua'}}>
                <View style={{flex: 1, margin: 10}}>
                <Image style={{width: 50, height: 50, borderRadius: 30}}
                source={{uri: item.avatar}}/>
                </View>
                <View style={{flex: 3, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <Text style={{fontSize: 20, fontFamily: 'Times New Roman', marginRight: 10}}>{item.username}</Text>
                <Image 
                style={{width: 20, height: 20, borderRadius: 10}}
                source={require('../images/online.png')}/>
                </View>
                
            </View>
            </TouchableOpacity>
             );
         } 
        }
        keyExtractor={item => item.userId}/>
        </View>
    );
}
