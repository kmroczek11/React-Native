import React, { Component } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import ListItem from "./ListItem";
import { HeaderBackButton } from "react-navigation";
import MyButton from "./MyButton";

class AdminPageScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Admin Page",
      headerStyle: {
        backgroundColor: "#00766c"
      },
      headerTitleStyle: {
        color: "#ffffff"
      },
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.goBack(null)} />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      // users: [
      //   { id: 0, login: "Abdul", password: "123" },
      //   { id: 1, login: "Sasha", password: "xyz" },
      //   { id: 2, login: "Miriam", password: "abc" },
      //   { id: 3, login: "Adele", password: "chwdp" }
      // ]
      users: this.props.navigation.state.params.users
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.navigation.goBack();
  }

  deleteUser(id) {
    fetch("http://192.168.1.106:3000/deleteUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id
      })
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Something went wrong on api server!");
        }
      })
      .then(response => {
        console.debug(response);
        this.setState({
          users: response.users
        });
        console.log("Users on client: ", this.state.users);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <View>
        <MyButton
          btStyle={styles.button}
          txtStyle={styles.btTxt}
          content="BACK TO LOGIN PAGE"
          btPress={this.goBack}
        />
        <FlatList
          data={this.state.users}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <ListItem
              navigation={this.props.navigation}
              deleteUser={this.deleteUser}
              id={item.id}
              login={item.login}
              password={item.password}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent",
    alignSelf: "center",
    margin: 10
  },
  btTxt: {
    fontSize: 20
  }
});

export default AdminPageScreen;
