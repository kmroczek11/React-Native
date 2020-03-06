import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Switch } from "react-native";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = () => {
    this.props.checkChange(this.props.id);
  };

  // onChange = () =>{
  //   this.setState({
  //     checked: !this.state.checked
  //   })
  // }

  render() {
    console.log("Id itemu: ", this.props.id);
    return (
      <View style={styles.listItem}>
        <Image style={styles.avatar} source={require("../assets/avatar.png")} />
        <View style={styles.middle}>
          <Text style={styles.mainTxt}>Timestamp: {this.props.timestamp}</Text>
          <Text style={styles.normTxt}>Latitude: {this.props.latitude}</Text>
          <Text style={styles.normTxt}>Longitude: {this.props.longitude}</Text>
        </View>
        <Switch onChange={this.onChange} value={this.props.checked} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  avatar: {
    width: 70,
    height: 70
  },
  middle: {
    flexDirection: "column"
  },
  mainTxt: {
    fontSize: 15,
    fontWeight: "bold"
  },
  normTxt: {
    fontSize: 10,
    fontWeight: "normal"
  }
});

export default ListItem;
