import React, { Component } from "react";
import { View, Text } from "react-native";
import MapView from "react-native-maps";

class Screen3 extends Component {
  static navigationOptions = {
    // header: null,
    title: "Lokalizacja na mapie",
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
      positions: this.props.navigation.state.params.positions
    };
  }

  render() {
    const markers = this.state.positions.map(position => {
      if (position.checked) {
        return (
          <MapView.Marker
            key={position.id}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude
            }}
            title={"pos"}
            description={"opis"}
          />
        );
      } else {
        return null;
      }
    });

    console.log(markers);

    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.state.positions[0].latitude,
          longitude: this.state.positions[0].longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      >
        {markers}
      </MapView>
    );
  }
}

export default Screen3;
