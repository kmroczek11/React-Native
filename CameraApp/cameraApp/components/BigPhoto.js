import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import * as MediaLibrary from "expo-media-library";
import MyButton from "./MyButton";
import { ToastAndroid } from 'react-native';

class BigPhoto extends Component {
    static navigationOptions = {
        title: 'Wybrane zdjęcie',
        headerStyle: {
            backgroundColor: '#ff3333'
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            photos: this.props.navigation.state.params.photos
        };
    }

    deletePhoto = async () => {
        await MediaLibrary.deleteAssetsAsync([this.props.navigation.state.params.photo.id]);
        ToastAndroid.showWithGravity(
            'Usunięto pomyślnie',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );

        let photos = this.state.photos
        for (let i = 0; i < photos.length; i++) {
            if (photos[i].uri == this.props.navigation.state.params.photo.uri) {
                photos.splice(i, 1)
            }
        }
        this.props.navigation.state.params.refresh(photos)
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imgCont}>
                    <Image
                        style={styles.img}
                        resizeMode={'cover'}
                        source={{ uri: this.props.navigation.state.params.photo.uri }}
                    />
                </View>
                <View style={styles.btCont}>
                    <MyButton
                        btStyle={styles.button}
                        txtStyle={styles.btTxt}
                        content="DELETE"
                        btPress={this.deletePhoto}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        margin: 3
    },
    imgCont: {
        flex: 2
    },
    img: {
        width: '100%',
        height: '100%'
    },
    btCont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btTxt: {
        fontWeight: 'bold'
    }
});

export default BigPhoto;
