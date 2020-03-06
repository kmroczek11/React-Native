import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import * as Font from "expo-font";
import MyButton from "./MyButton";

class Screen1 extends Component {
    static navigationOptions = {
        header: null
      };

    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false
        };
    }

    componentDidMount = async () => {
        await Font.loadAsync({
            'myfont': require('../assets/disney.ttf'),
        });
        this.setState({ fontloaded: true })
    }

    render() {
        return (
            this.state.fontloaded
                ?
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <View style={styles.header}>
                        <Text style={styles.hdText}>GeoMap App</Text>
                        <Text style={styles.hdsText}>Find And Save Your Position</Text>
                    </View>
                    <View style={styles.content}>
                        <MyButton
                            btStyle={styles.button}
                            txtStyle={styles.btTxt}
                            content="START"
                            btPress={() => this.props.navigation.navigate("s2")}
                        />
                    </View>
                </KeyboardAvoidingView>
                :
                null
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000"
    },
    header: {
        flex: 2,
        backgroundColor: "#26a69a",
        justifyContent: "center",
        alignItems: "center"
    },
    hdText: {
        color: "white",
        fontFamily: 'myfont',
        fontSize: 70,
        textAlign: "center"
    },
    hdsText: {
        color: "white",
        fontFamily: 'myfont',
        fontSize: 40,
        textAlign: "center"
    },
    content: {
        flex: 3,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: "white"
    },
    button: {
        backgroundColor: "transparent",
        margin: 20
    },
    btTxt: {
        fontSize: 20
    }
});

export default Screen1;
