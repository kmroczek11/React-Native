import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList
} from "react-native";
import firebase from "firebase";
import StationItem from "./StationItem";
import MyButton from "./MyButton";
import { ToastAndroid } from "react-native";

class StationsScreen extends Component {
  static navigationOptions = {
    title: "Stacje rowerowe w NY",
    headerStyle: {
      backgroundColor: "#f7ca18"
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      stations: null,
      data: [],
      dataGot: false
    };
    this.stations = this.getFirebase().child("stations"); // "stations" to nazwa tablicy w obiekcie jsona
  }

  getFirebase = () => {
    return firebase.database().ref();
  };

  componentDidMount = () => {
    this.stations.on("value", elements => {
      console.log(elements);
      // wykonaj foreach na tej kolekcji, wpisując potrzebne dane do tablicy w state
      let data = this.state.data;

      elements.forEach(item => {
        data.push({
          stationName: item.val().stationName,
          latitude: item.val().latitude,
          longitude: item.val().longitude,
          totalDocks: item.val().totalDocks,
          availableDocks: item.val().availableDocks,
          statusValue: item.val().statusValue
        });
        console.log(); // jedna wartość z obiektu
      });

      this.setState({
        data: data,
        dataGot: true
      });
    });
  };

  logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() =>
        ToastAndroid.showWithGravity(
          "Wylogowano",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )
      )
      .catch(error => alert(error));
    this.props.navigation.navigate("LoadingScreen");
  };

  render() {
    console.disableYellowBox = true;
    return this.state.dataGot ? (
      <View>
        <Text style={styles.header}>
          Witaj: {firebase.auth().currentUser.email}
        </Text>
        <View style={styles.buttonsBar}>
          <MyButton
            btStyle={styles.button}
            txtStyle={styles.btTxt}
            content="MAIN PAGE"
            btPress={() => this.props.navigation.navigate("WelcomeScreen")}
          />
          <MyButton
            btStyle={styles.button}
            txtStyle={styles.btTxt}
            content="LOGOUT"
            btPress={this.logOut}
          />
        </View>
        <FlatList
          style={styles.stationList}
          extraData={this.state}
          keyExtractor={(item, index) => item + index}
          data={this.state.data}
          renderItem={({ item }) => (
            <StationItem
              navigation={this.props.navigation}
              name={item.stationName}
              latitude={item.latitude}
              longitude={item.longitude}
              total={item.totalDocks}
              available={item.availableDocks}
              status={item.statusValue}
            />
          )}
        />
      </View>
    ) : (
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
  },
  stationList: {
    padding: 5
  },
  header: {
    alignSelf: "center",
    fontSize: 25,
    color: "#f7ca18"
  },
  buttonsBar: {
    flexDirection: "row",
    alignSelf: "center"
  },
  button: {
    margin: 5
  },
  btTxt: {
    fontWeight: "bold"
  }
});

export default StationsScreen;
