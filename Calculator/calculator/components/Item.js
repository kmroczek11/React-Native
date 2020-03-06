import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onButtonPress = this.onButtonPress.bind(this)
  }

  onButtonPress(){
      this.props.add(this.props.option)
  }

  render() {
    return (
      <TouchableOpacity
      onPress={this.onButtonPress}
        style={{
          flex: 1,
          backgroundColor: this.props.color,
          justifyContent:'center',
          alignItems: "center"
        }}
      >
        <Text style={{ color: "white", fontSize: '4vw' }}>
          {this.props.option}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Item;
