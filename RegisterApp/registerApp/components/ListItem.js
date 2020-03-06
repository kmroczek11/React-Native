import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import MyButton from "./MyButton";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  editUser() {
    this.props.navigation.navigate("s3", { login: this.props.login, password: this.props.password });
  }

  deleteUser() {
    this.props.deleteUser(this.props.id)
  }

  render() {
    return (
      <View style={styles.listItem}>
        <Image style={styles.avatar} source={require("../assets/avatar.png")} />
        <Text style={styles.texts}>{this.props.id}</Text>
        <Text style={styles.texts}>{this.props.login}</Text>
        <Text style={styles.texts}>{this.props.password}</Text>
        <MyButton
          btStyle={styles.button}
          txtStyle={styles.btTxt}
          content="EDYTUJ"
          btPress={this.editUser}
        />
        <MyButton
          btStyle={styles.button}
          txtStyle={styles.btTxt}
          content="USUŃ"
          btPress={this.deleteUser}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    justifyContent:'space-between',
    alignItems: "center"
  },
  avatar: {
    width: 80,
    height: 80
  },
  texts: {
    fontSize: 20
  },
  button: {
    backgroundColor: "transparent",
    alignSelf: "center"
  },
  btTxt: {
    fontSize: 20
  }
});

export default ListItem;
