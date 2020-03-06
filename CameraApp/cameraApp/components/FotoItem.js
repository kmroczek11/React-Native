import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

class FotoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  addPhoto = () => {
    this.props.selectPhoto(this.props.photo, "add");
  };

  removePhoto = () => {
    if (!this.props.selected) {
      this.props.navigation.navigate("BigPhotoScreen", {
        photo: this.props.photo,
        photos: this.props.photos,
        refresh: this.props.refresh
      });
    }
    this.props.selectPhoto(this.props.photo, "remove");
  };

  render() {
    return (
      <TouchableOpacity onPress={this.removePhoto} onLongPress={this.addPhoto}>
        {this.props.selected ? (
          <View style={styles.container}>
            <Image
              style={{
                width:
                  (Dimensions.get("window").width - 12) /
                    this.props.numColumns -
                  6,
                height:
                  (Dimensions.get("window").width - 12) /
                    this.props.numColumns -
                  6,
                opacity: 0.3
              }}
              source={{ uri: this.props.photo.uri }}
            />
            <Ionicons style={styles.iconAdd} name="md-add" size={50} />
            <Text style={styles.txtId}>{this.props.photo.id}</Text>
          </View>
        ) : (
          <View style={styles.container}>
            <Image
              style={{
                width:
                  (Dimensions.get("window").width - 12) /
                    this.props.numColumns -
                  6,
                height:
                  (Dimensions.get("window").width - 12) /
                    this.props.numColumns -
                  6
              }}
              source={{ uri: this.props.photo.uri }}
            />
            <Text style={styles.txtId}>{this.props.photo.id}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconAdd: {
    position: "absolute",
    color: "#ff3333"
  },
  txtId: {
    position: "absolute",
    right: 0,
    bottom: 0,
    color: "white",
    margin: 5
  }
});

export default FotoItem;
