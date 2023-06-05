import { Text, View, Button } from "react-native";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions";
import Feed from "./main/Feed";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Profile from "./main/Profile";

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = ()=>{
    return null
}

export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { currentUser } = this.props;

    if (currentUser === undefined) {
      return null;
    }

    return (
      <Tab.Navigator initialRouteName="Feed" labeled={false}>
        <Tab.Screen
          name="Feed"
          component={Feed}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
            listeners={({navigation}) => ({
                tabPress: event =>{
                    event.preventDefault();
                    navigation.navigate("Add")
                }
            })}
          name="Empty"
          component={EmptyScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus-box" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen name="Profile" component={Profile}  options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-circle" color={color} size={26} />
            ),
          }} />
            
      </Tab.Navigator>
    );
  }
}

const mapStatetoProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(Main);
