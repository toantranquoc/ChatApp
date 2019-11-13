import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

//Import screen from components
import Chat from './components/Chat';
import Flash from './components/Flash';
import Register from './components/Register';
import JoinChat from './components/JoinChat';
import OnlineUser from './components/OnlineUser'
const AppStack = createStackNavigator({ Home: OnlineUser, Chat: Chat });

export default createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Join: JoinChat,
      Intro: Flash,
      Register: Register
    },
    {
      initialRouteName: "Intro"
    }
  )
);