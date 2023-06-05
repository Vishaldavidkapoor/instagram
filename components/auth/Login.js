import { Button, TextInput, View } from "react-native";
import React, { Component } from "react";
import firebase from "firebase/compat/app";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.onSignIn = this.onSignIn.bind(this);
  }

  onSignIn() {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => console.log(res)).catch((e) => console.log(e));
  }

  render() {
    return (
      <View style={{flex:1, justifyContent:'center'}}>
        <TextInput
          placeholder="Enter email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="Enter password"
          onChangeText={(password) => this.setState({ password })}
          secureTextEntry={true}
        />
        <Button title="Sign In" onPress={() => this.onSignIn()} />
      </View>
    );
  }
}

export default Login;
