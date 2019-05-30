import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/reducers';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { primary, white } from './theme/theme';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import DeckListView from './views/DeckListView';
import AddDeck from './views/AddDeck';
import DeckView from './views/DeckView';
import AddQuestion from './views/AddQuestion';
import QuizView from './views/QuizView';
import { setLocalNotification } from "./utils/helpers";


function FlashcardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


const Tabs = TabNavigator({
  DeckListView: {
    screen: DeckListView,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='list' size={20} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus' size={20} color={tintColor} />
    },
  },
}, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? primary : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : primary,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  })

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: primary,
      }
    }
  },
  AddQuestion: {
    screen: AddQuestion,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: primary,
      }
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: primary,
      }
    }
  }
})



export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }


  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <FlashcardsStatusBar backgroundColor={primary} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}