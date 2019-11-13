import React from 'react';
import {View} from 'react-native'
import {GiftedChat} from 'react-native-gifted-chat'
import {useDispatch, useSelector} from 'react-redux'
Chat.navigationOptions = screenProps => ({
  title: screenProps.navigation.getParam('name')
});

export default function Chat({navigation}) {
  const disPatch = useDispatch();
  const selfUser = useSelector(state => state.selfUser);
  const userId = navigation.getParam('userid');
  const conversations = useSelector(state => state.conversations);
  const messages = conversations[userId].messages;
//const textReceiveMessage = receiveMessage.map(msg => (<Text key={msg}>{msg}</Text>));
  return (
    <View style={{flex: 1}}>
    <GiftedChat
      renderUsernameOnMessage
      messages={messages}
      onSend={messages => {
        disPatch({
          type: 'server/private_message', 
          data: { message: messages[0], conversationId: userId }
        }) ;
        disPatch({
          type: 'private_message', 
          data: { message: messages[0], conversationId: userId }
        });
      }}
      user={{
      _id: selfUser.userId
    }} />
    </View>
  );
}
