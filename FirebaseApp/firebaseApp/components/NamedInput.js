import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

export default class NamedInput extends React.Component {
  render() {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.text}>{this.props.name}</Text>
        <TextInput
          style={styles.input}
          keyboardType={this.props.keyboardType}
          // value={this.props.value}
          onChangeText={this.props.onChangeText}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          secureTextEntry={this.props.name == "Hasło"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    margin: 8
  },

  text: {
    color: "#212121"
  },

  input: {
    padding: 4,
    borderColor: "#212121",
    borderWidth: 1,
    borderRadius: 4
  }
});
