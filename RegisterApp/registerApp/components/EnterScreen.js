import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import MyButton from "./MyButton";

class EnterScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: ""
    };
    this.registerUser = this.registerUser.bind(this);
  }

  registerUser() {
    fetch("http://192.168.1.102:3000", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: this.state.login,
        password: this.state.password
      })
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Something went wrong on api server!");
        }
      })
      .then(response => {
        console.debug(response);
        console.log("Status", response.status);
        switch (response.status) {
          case "exists":
            alert("User already exists!");
            break;
          case "empty":
            alert("You left empty fields!");
            break;
          case "ok":
            this.props.navigation.navigate("s2", { users: response.users });
            break;
          default:
            break;
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.header}>
          <Text style={styles.hdText}>Register Node App</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.txtIn}
            onChangeText={login => this.setState({ login })}
            value={this.state.login}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.txtIn}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <MyButton
            btStyle={styles.button}
            txtStyle={styles.btTxt}
            content="REGISTER"
            btPress={this.registerUser}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000"
  },
  header: {
    flex: 2,
    backgroundColor: "#26a69a",
    justifyContent: "center",
    alignItems: "center"
  },
  hdText: {
    color: "white",
    fontSize: 60,
    textAlign: "center"
  },
  content: {
    flex: 3,
    backgroundColor: "white"
  },
  label: {
    fontSize: 40,
    margin: 20
  },
  txtIn: {
    fontSize: 40,
    color: "#26a69a",
    borderBottomWidth: 2,
    borderBottomColor: "grey",
    marginRight: 20,
    marginLeft: 20,
    height: 80
  },
  button: {
    backgroundColor: "transparent",
    margin: 20,
    alignSelf: "center"
  },
  btTxt: {
    fontSize: 20
  }
});

export default EnterScreen;
