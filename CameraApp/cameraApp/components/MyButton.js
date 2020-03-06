import React, { Component } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';

class MyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity style={this.props.btStyle} onPress={this.props.btPress}>
          <Text style={this.props.txtStyle}>{this.props.content}</Text>
      </TouchableOpacity>
    );
  }
}

// MyButton.propTypes = {
//   btStyle: PropTypes.object.isRequired,
//   txtStyle: PropTypes.object.isRequired,
//   content: PropTypes.elementType.isRequired,
//   btPress: PropTypes.func.isRequired
// };

export default MyButton;
