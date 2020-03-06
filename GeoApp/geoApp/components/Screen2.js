import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  FlatList,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import MyButton from "./MyButton";
import ListItem from "./ListItem";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

class Screen2 extends Component {
  static navigationOptions = {
    // header: null,
    title: "Zapis Pozycji",
    headerStyle: {
      backgroundColor: "#006400"
    },
    headerTitleStyle: {
      color: "#ffffff"
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      positions: [],
      selectAllPositions: false,
      localisationGot: false
    };
  }

  setPermissions = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      alert("odmawiam przydzielenia uprawnień do czytania lokalizacji");
    }
  };

  componentDidMount() {
    this.setPermissions();
    this.getAllData();
  }

  getAllData = async () => {
    // this.clearData;
    this.setState({
      localisationGot: false
    });
    let keys = await AsyncStorage.getAllKeys();
    // console.log("keys", keys);
    let stores = await AsyncStorage.multiGet(keys);
    // console.log("stores", stores);
    let maps = stores.map((result, i, store) => {
      let key = store[i][0];
      let value = JSON.parse(store[i][1]);
      // console.log(key, value);

      var posObj = {
        id: value.id,
        timestamp: value.timestamp,
        latitude: value.latitude,
        longitude: value.longitude,
        checked: false
      };

      var positions = this.state.positions;
      positions.push(posObj);
      this.setState({
        positions: positions
      });
    });

    this.setState({
      localisationGot: true
    });
  };

  clearData = async () => {
    await AsyncStorage.getAllKeys()
      .then(keys => AsyncStorage.multiRemove(keys))
      .then(() => console.log("usunięto"));
  };

  removePositions = () => {
    this.setState({
      positions: [],
      refresh: !this.state.refresh
    });
    this.clearData();
  };

  setData = async obj => {
    var key = "key" + Math.round(Math.random() * 100);
    await AsyncStorage.setItem(key, JSON.stringify(obj));
    // this.getData(key);
  };

  // getData = async key => {
  //   let val = await AsyncStorage.getItem(key);
  //   console.log("Pobrana wartość: ", val);
  // };

  getPosition = async () => {
    var id;
    if (this.state.positions.length != 0) {
      //pobranie id z poprzedniego elementu
      id = this.state.positions[this.state.positions.length - 1].id + 1;
    } else {
      id = 0;
    }

    this.setState({
      localisationGot: false
    });
    let pos = await Location.getCurrentPositionAsync({});

    var positions = this.state.positions;
    var posObj = {
      id: id,
      timestamp: pos.timestamp,
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      checked: false
    };
    positions.push(posObj);

    this.setState({
      id: id,
      positions: positions,
      localisationGot: true
    });

    this.setData(posObj);
    // console.log("Pozycje: ", this.state.positions);
  };

  checkChange = id => {
    console.log("Zmiana switcha o id: ", id);
    var positions = this.state.positions;
    positions[id].checked = !positions[id].checked;
    console.log(positions);
    this.setState({
      positions: positions,
      refresh: !this.state.refresh
    });
  };

  selectAll = () => {
    var selectAllPositions = this.state.selectAllPositions
    selectAllPositions = !selectAllPositions
    this.setState({
      selectAllPositions: selectAllPositions
    });

    var positions = this.state.positions;
    if (selectAllPositions) {
      for (let i = 0; i < positions.length; i++) {
        positions[i].checked = true;
      }
    } else {
      for (let i = 0; i < positions.length; i++) {
        positions[i].checked = false;
      }
    }

    this.setState({
      positions: positions,
      refresh: !this.state.refresh
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <MyButton
            btStyle={styles.button}
            txtStyle={styles.btTxt}
            content="Pobierz i zapisz pozycję"
            btPress={this.getPosition}
          />
          <MyButton
            btStyle={styles.button}
            txtStyle={styles.btTxt}
            content="Usuń wszystkie dane"
            btPress={this.removePositions}
          />
        </View>
        <View style={styles.goToMapBar}>
          <MyButton
            btStyle={styles.btGoToMap}
            txtStyle={styles.btTxt}
            content="Przejdź do mapy"
            btPress={() =>
              this.props.navigation.navigate("s3", {
                positions: this.state.positions
              })
            }
          />
          <Switch
            onChange={this.selectAll}
            value={this.state.selectAllPositions}
          ></Switch>
        </View>
        <View style={styles.flatList}>
          {this.state.localisationGot ? (
            <FlatList
              extraData={this.state.refresh}
              data={this.state.positions}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => (
                <ListItem
                  id={item.id}
                  timestamp={item.timestamp}
                  latitude={item.latitude}
                  longitude={item.longitude}
                  checked={item.checked}
                  checkChange={this.checkChange}
                />
              )}
            />
          ) : (
            <ActivityIndicator size="large" color="#006400" />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  goToMapBar: {
    flex: 1
  },
  button: {
    backgroundColor: "transparent",
    margin: 15
  },
  btTxt: {
    fontSize: 15
  },
  btGoToMap: {
    backgroundColor: "transparent",
    margin: 15,
    alignSelf: "center"
  },
  goToMapBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  flatList: {
    flex: 8
  }
});

export default Screen2;
