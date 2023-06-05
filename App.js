import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./components/auth/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
import Main from "./components/Main";
import Add from "./components/main/Add";

const store = createStore(rootReducer, applyMiddleware(thunk));

const firebaseConfig = {
  apiKey: "AIzaSyC1bJDhZTXnpabD5NljPHbfXzqBgVKNm8I",
  authDomain: "instagram-75c56.firebaseapp.com",
  projectId: "instagram-75c56",
  storageBucket: "instagram-75c56.appspot.com",
  messagingSenderId: "964748556273",
  appId: "1:964748556273:web:fd4a5a15610f708a9af650",
  measurementId: "G-K371HE2ZEZ",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const Stack = createStackNavigator();
export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }
  render() {
    const { loggedIn, loaded } = this.state;

    if (!loaded) {
      return <ActivityIndicator />;
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={Landing}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <Provider store={store}>
         <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="Main" component={Main}  />
          <Stack.Screen name="Add" component={Add} options={{headerShown: true}} />
        </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
