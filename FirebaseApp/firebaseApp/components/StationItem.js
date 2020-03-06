import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import MyButton from "./MyButton";

class StationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      statusColor: "",
      unavailable: this.props.total - this.props.available
    };
    if (this.props.status == "In Service") {
      this.state.status = "Dostępna";
      this.state.statusColor = "green";
    } else {
      this.state.status = "W naprawie";
      this.state.statusColor = "red";
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{this.props.name}</Text>
        <View style={styles.bar}>
          <View style={styles.description}>
            <Text style={styles.desTxt}>Latitude: {this.props.latitude}</Text>
            <Text style={styles.desTxt}>Longitude: {this.props.longitude}</Text>
            <Text style={styles.desTxt}>Razem stacji: {this.props.total}</Text>
          </View>
          <View style={styles.statusBar}>
            <View style={{ flex: this.props.total, flexDirection: "row" }}>
              <View
                style={{
                  backgroundColor: "black",
                  flex: this.state.unavailable
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>R</Text>
              </View>
              <View
                style={{
                  backgroundColor: "darkgrey",
                  flex: this.props.available
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>S</Text>
              </View>
            </View>
            <View style={{ backgroundColor: this.state.statusColor }}>
              <Text>{this.state.status}</Text>
            </View>
          </View>
        </View>
        <MyButton
          btStyle={styles.button}
          txtStyle={styles.btTxt}
          content="MAPA"
          btPress={() =>
            this.props.navigation.navigate("MapScreen", {
              latitude: this.props.latitude,
              longitude: this.props.longitude,
              name: this.props.name
            })
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f5f5",
    padding: 20,
    elevation: 8,
    borderRadius: 10,
    marginBottom: 5
  },
  header: {
    fontSize: 15,
    fontWeight: "bold"
  },
  bar: {
    flex: 3,
    flexDirection: "row"
  },
  description: {
    flex: 1,
    flexDirection: "column"
  },
  desTxt: {
    fontSize: 8
  },
  statusBar: {
    flex: 2,
    paddingLeft: 10
  },
  button: {
    margin: 10,
    alignSelf: "flex-end"
  },
  btTxt: {
    fontSize: 10
  }
});

export default StationItem;
