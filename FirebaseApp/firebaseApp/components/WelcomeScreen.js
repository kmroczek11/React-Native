import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import * as Font from "expo-font";
import MyButton from "./MyButton";

class WelcomeScreen extends Component {
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
            'myfont': require('../assets/MyFont.ttf'),
        });
        this.setState({ fontloaded: true })
    }

    render() {
        return (
            this.state.fontloaded
                ?
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <View style={styles.header}>
                        <Text style={styles.hdText}>FirebaseApp</Text>
                        <Text style={styles.hdsText}>
                            Firebase Authentication{"\n"}
                            Firebase Database
                        </Text>
                    </View>
                    <View style={styles.content}>
                        <MyButton
                            btStyle={styles.button}
                            txtStyle={styles.btTxt}
                            content="START"
                            btPress={() => this.props.navigation.navigate("RegisterScreen")}
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
        backgroundColor: "#f7ca18",
        justifyContent: "center",
        alignItems: "center"
    },
    hdText: {
        color: "black",
        fontFamily: 'myfont',
        fontSize: 50,
        textAlign: "center"
    },
    hdsText: {
        color: "black",
        fontFamily: 'myfont',
        fontSize: 20,
        textAlign: "center"
    },
    content: {
        flex: 3,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: "white"
    },
    button: {
        margin: 20
    },
    btTxt: {
        fontSize: 20
    }
});

export default WelcomeScreen;
