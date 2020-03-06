import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { HeaderBackButton } from "react-navigation";

class EditScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Edit Page",
      headerStyle: {
        backgroundColor: "#00766c"
      },
      headerTitleStyle: {
        color: "#ffffff"
      },
      headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack(null)} />
    };
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.secondary}>
          <Image
            style={styles.avatar}
            source={require("../assets/avatar.png")}
          />
          <Text style={styles.texts}>
            {this.props.navigation.state.params.login}
          </Text>
          <Text style={styles.texts}>
            {this.props.navigation.state.params.password}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  secondary: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  avatar: {
    width: 200,
    height: 200
  },
  texts: {
    fontSize: 40
  }
});

export default EditScreen;
