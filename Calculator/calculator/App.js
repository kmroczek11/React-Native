import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Item from "./components/Item";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
          [1, 4, 7, '.'],
          [2, 5, 8, 0],
          [3, 6, 9, '='],
          ["C", "/", "*", "-", "+"]
      ],
      colors: ["rgb(67,67,67)", "rgb(99,99,99)"],
      expression: '',
      result:''
    };
    this.addToExpression = this.addToExpression.bind(this)
  }

  addToExpression(e){
    let specialOpt = ['=', 'C']
    let mathOpt = ['.', '/', '*', '-', '+']
    let expression = this.state.expression

    if (e == '='){
      let result = eval(this.state.expression)
      this.setState({
        result: result
      })
    }

    if (e == 'C'){
      expression = expression.substring(0, expression.length - 1);
      this.setState({
        expression: expression
      })
    }

    let operatorRepeats = false
    if (mathOpt.includes(this.state.expression.slice(-1))){
      for (let i = 0; i < mathOpt.length; i++){
        if (mathOpt[i] == e){
          operatorRepeats = true
          break
        }
      }
    }

    if (!specialOpt.includes(e) && !operatorRepeats)
      expression += e

    console.log('Wyrażenie ', expression)
    this.setState({
      expression: expression
    })
  }

  render() {
    var buttonsCols = [];
    for (let i = 0; i < this.state.options.length; i++) {
      var options = [];
      let clIndex = 0
      if (i == this.state.options.length - 1)
        clIndex = 1

      for (let j = 0; j < this.state.options[i].length; j++) {
        options.push(
          <Item
            add={this.addToExpression}
            option={this.state.options[i][j]}
            color={this.state.colors[clIndex]}
          />
        );
      }
      buttonsCols.push(<View style={styles.column}>{options}</View>);
    }

    return (
      <View style={styles.container}>
        <View style={styles.bar}>
          <Text style={styles.exStyle}>
          {this.state.expression}
          </Text>
          <Text style={styles.resStyle}>
          {this.state.result}
          </Text>
        </View>
        <View style={styles.buttons}>
          {buttonsCols}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000"
  },
  bar: {
    flex: 1,
    backgroundColor: "rgb(71,255,203)",
    flexDirection:'column',
    alignItems:'flex-end'
  },
  buttons: {
    flex: 2,
    flexDirection:'row',
    backgroundColor: "#ffffff"
  },
  column: {
    flex:1,
    flexDirection: "column"
  },
  exStyle:{
    fontSize:'7vw',
    color: 'black'
  },
  resStyle:{
    fontSize:'5vw',
    color: 'black'
  }
});
