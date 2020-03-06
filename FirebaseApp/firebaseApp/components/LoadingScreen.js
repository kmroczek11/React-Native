import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import firebase from "firebase";

var config = {
  apiKey: "AIzaSyBEUDwUZQU3n8o9YQwEw-ycwaF0_jIzIxE",
  authDomain: "mroczek4ia1.firebaseapp.com",
  databaseURL: "https://mroczek4ia1.firebaseio.com",
  projectId: "mroczek4ia1",
  storageBucket: "mroczek4ia1.appspot.com",
  messagingSenderId: "881571402596",
  appId: "1:881571402596:web:0fca57dc68fff35efba071",
  measurementId: "G-44RT791TYB"
};

firebase.initializeApp(config);

class LoadingScreen extends Component {
  static navigationOptions = {
    title: "Autoryzacja",
    headerStyle: {
      backgroundColor: "#f7ca18"
    }
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // wtedy przechodzimy do wyświetlenia ekranu z listą danych pobranych z bazy firebase
        this.props.navigation.navigate("StationsScreen");
      } else {
        // wtedy przechodzimy do ekranu logowania
        this.props.navigation.navigate("LoginScreen");
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#f7ca18" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default LoadingScreen;
