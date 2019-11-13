import React from 'react';
import AppContainer from './AppContainer';
//adding for redux
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'react-native-socket.io-client';

const socket = io("http://192.168.1.10:3000");
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

//create reducer
function reducer(state = {conversations: {}}, action){
    switch(action.type){
        case 'online_users': //get all users online from server
        const conversations = { ...state.conversations };
        const usersOnline = action.data;
        for (let i = 0; i < usersOnline.length; i++) {
          const userId = usersOnline[i].userId;
          if (conversations[userId] === undefined) {
            conversations[userId] = {
              messages: [],
              username: usersOnline[i].username
            };
          }
        }
        return { ...state, usersOnline, conversations };
        case 'private_message':
                const conversationId = action.data.conversationId;
                return {
                  ...state,
                  conversations: {
                    ...state.conversations,
                    [conversationId]: {
                      ...state.conversations[conversationId],
                      messages: [
                        action.data.message,
                        ...state.conversations[conversationId].messages
                      ]
                    }
                  }
                };
        case 'self_user':
            return {...state, selfUser: action.data};
        default:
            return state;
    }
}

//create store to save state
const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

store.subscribe(() => {
    console.log('new state', store.getState());
});
export default function App(){
    return(
        <Provider store={store}>
                <AppContainer/>
        </Provider>

    ); 
}