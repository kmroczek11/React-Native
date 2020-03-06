import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Permissions from "expo-permissions";
import { Camera } from 'expo-camera';
import MyButton from './MyButton'
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import * as MediaLibrary from "expo-media-library";
import { BackHandler } from "react-native"
import { ToastAndroid } from 'react-native';

class Screen3 extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            photos: this.props.navigation.state.params.photos,
            screenWidth: null,
            screenHeight: null,
            camera: null,
            hasCameraPermission: null,         // przydzielone uprawnienia do kamery
            type: Camera.Constants.Type.back,  // typ kamery
        };
    }

    setPermissions = async () => {
        let { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii')
        } else {
            this.setState({ hasCameraPermission: status == 'granted' });
        }
    }

    componentDidMount = () => {
        this.setState({
            screenWidth: Dimensions.get("window").width,
            screenHeight: Dimensions.get("window").height
        })

        this.setPermissions()

        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.state.params.refresh(this.state.photos)
        this.props.navigation.goBack()
        return true;
    }

    rollOver = () => {
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        })
    }

    takePhoto = async () => {
        if (this.camera) {
            let foto = await this.camera.takePictureAsync();
            let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyslnie zapisuje w DCIM
            // alert(JSON.stringify(asset, null, 4))
            let photos = this.state.photos
            photos.push(asset)
            this.setState({
                photos: photos
            })
            ToastAndroid.showWithGravity(
                'Zdjęcie zostało zapisane',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    }

    render() {
        console.disableYellowBox = true
        const { hasCameraPermission } = this.state; // podstawienie zmiennej ze state
        if (hasCameraPermission == null) {
            return <View />;
        } else if (hasCameraPermission == false) {
            return <Text>brak dostępu do kamery</Text>;
        } else {
            return (
                <View style={styles.container}>
                    <Camera
                        style={{ width: this.state.screenWidth, height: this.state.screenHeight }}
                        ref={ref => {
                            this.camera = ref; // Uwaga: referencja do kamery używana później
                        }}
                        type={this.state.type}>
                        <View style={styles.buttons}>
                            <MyButton
                                btStyle={styles.button}
                                txtStyle={styles.btTxt}
                                content={<Ionicons name="md-refresh" size={50} />}
                                btPress={this.rollOver}
                            />
                            <MyButton
                                btStyle={styles.button}
                                txtStyle={styles.btTxt}
                                content={<Ionicons name="md-add" size={50} />}
                                btPress={this.takePhoto}
                            />
                            <MyButton
                                btStyle={styles.button}
                                txtStyle={styles.btTxt}
                                content={<Ionicons name="md-settings" size={50} />}
                                btPress={() => this.props.navigation.navigate("s2")}
                            />
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttons: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    button: {
        width: 80,
        height: 80,
        margin: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00BCD4',
        borderRadius: 50,
    },
    btTxt: {
        fontSize: 20
    }
});

export default Screen3;
