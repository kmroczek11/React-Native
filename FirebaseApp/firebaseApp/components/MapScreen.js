import React, { Component } from "react";
import MapView from "react-native-maps";

class MapScreen extends Component {
  static navigationOptions = {
    title: "Lokalizacja stacji na mapie",
    headerStyle: {
      backgroundColor: "#f7ca18"
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      latitude: this.props.navigation.state.params.latitude,
      longitude: this.props.navigation.state.params.longitude,
      name: this.props.navigation.state.params.name
    };
    console.log(this.state.latitude, this.state.longitude)
  }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      >
        <MapView.Marker
          key={this.state.name}
          coordinate={{
            latitude: this.state.latitude,
            longitude: this.state.longitude
          }}
          title={this.state.name}
          description="Station"
        />
      </MapView>
    );
  }
}

export default MapScreen;
