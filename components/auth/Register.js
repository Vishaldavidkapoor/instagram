import { Button, TextInput, View } from "react-native";
import React, { Component } from "react";
import firebase from "firebase/compat/app";

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };
    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp() {
    const { email, password, name } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) =>
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid).set({
            name, email
          })
      )
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <TextInput
          placeholder="Enter name"
          onChangeText={(name) => this.setState({ name })}
        />
        <TextInput
          placeholder="Enter email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="Enter password"
          onChangeText={(password) => this.setState({ password })}
          secureTextEntry={true}
        />
        <Button title="Sign Up" onPress={() => this.onSignUp()} />
      </View>
    );
  }
}

export default Register;
