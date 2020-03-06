import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
  Image
} from "react-native";
import NamedInput from "./NamedInput";
import MyButton from "./MyButton";
import firebase from "firebase";

class LoginScreen extends Component {
  static navigationOptions = {
    title: "Logowanie do Bikes In NY",
    headerStyle: {
      backgroundColor: "#f7ca18"
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: ""
    };
  }

  logIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate("LoadingScreen"))
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.form}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
          <NamedInput
            name="Email"
            value=""
            onChangeText={e => (this.state.email = e)}
          />
          <NamedInput
            name="Hasło"
            value=""
            onChangeText={e => (this.state.password = e)}
          />

          <MyButton
            btStyle={styles.button}
            txtStyle={styles.btTxt}
            content="ZALOGUJ SIĘ"
            btPress={this.logIn}
          />
          <MyButton
            btStyle={styles.button}
            txtStyle={styles.btTxt}
            content="NIE MASZ JESZCZE KONTA? ZAREJESTRUJ SIĘ"
            btPress={() => this.props.navigation.navigate("RegisterScreen")}
          />
        </View>
        <Text style={styles.error}>{this.state.errorMessage}</Text>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    alignSelf: "center",
    width: 150,
    height: 150
  },
  button: {
    margin: 10,
    alignSelf: "center"
  },
  btTxt: {
    fontSize: 15
  },
  error: {
    color: "red",
    fontSize: 10
  }
});

export default LoginScreen;
