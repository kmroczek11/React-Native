import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Dimensions } from 'react-native';
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import MyButton from "./MyButton";
import FotoItem from "./FotoItem";
import { ToastAndroid } from 'react-native';

class Screen2 extends Component {
  static navigationOptions = {
    title: 'Zdjęcia zapisane w telefonie',
    headerStyle: {
      backgroundColor: '#ff3333'
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      numColumns: 4,
      photosGot: false,
      photos: null,
      photosToDelete: []
    };
  }

  setPermissions = async () => {
    let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('brak uprawnień do czytania image-ów z galerii')
    }
  }

  getPhotos = async () => {
    let obj = await MediaLibrary.getAssetsAsync({
      first: 30,           // ilość pobranych assetów
      mediaType: 'photo'    // typ pobieranych danych, photo jest domyślne
    })

    // alert(JSON.stringify(obj.assets, null, 4))

    this.setState(({
      photos: obj.assets,
      photosGot: true
    }))
  }

  componentDidMount = () => {
    this.setPermissions()
    this.getPhotos()
  }

  refreshPhotosInGallery = (photos) => {
    this.setState({
      photos: photos
    })
  }

  changePhotosLayout = () => {
    this.setState({
      numColumns: this.state.numColumns === 4
        ? 1
        : 4,
    })
  }

  selectPhoto = (photo, operation) => {
    console.log("Photo id: ", photo.id)
    let photosToDelete = this.state.photosToDelete
    if (operation == 'add') {
      photosToDelete.push(photo.id)
      console.log('Photos after adding: ', photosToDelete)
    } else {
      photosToDelete = photosToDelete.filter((id) => id != photo.id)
      console.log('Photos after deleting: ', photosToDelete)
    }
    this.setState({
      photosToDelete: photosToDelete
    })
  }

  removeSelected = async () => {
    let photosToDelete = this.state.photosToDelete
    let photos = this.state.photos
    if (!photosToDelete.length) {
      ToastAndroid.showWithGravity(
        'Zaznacz zdjęcia do usunięcia!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return
    }
    await MediaLibrary.deleteAssetsAsync(this.state.photosToDelete);

    photos = photos.filter((photo) => !photosToDelete.includes(photo.id))

    this.setState({
      photos: photos,
      photosToDelete: []
    })
  }

  render() {
    return (
      this.state.photosGot
        ?
        <View style={styles.container}>
          <View style={styles.header}>
            <MyButton
              btStyle={styles.button}
              txtStyle={styles.btTxt}
              content="GRID/LIST"
              btPress={this.changePhotosLayout}
            />
            <MyButton
              btStyle={styles.button}
              txtStyle={styles.btTxt}
              content="OPEN CAMERA"
              btPress={() => {
                this.props.navigation.navigate("CameraScreen", { photos: this.state.photos, refresh: this.refreshPhotosInGallery })
              }}
            />
            <MyButton
              btStyle={styles.button}
              txtStyle={styles.btTxt}
              content="REMOVE SELECTED"
              btPress={this.removeSelected}
            />
          </View>
          <View style={styles.flatList}>
            <FlatList
              extraData={this.state}
              keyExtractor={(item, index) => item + index}
              data={this.state.photos}
              numColumns={this.state.numColumns}
              key={this.state.numColumns}
              renderItem={({ item }) => (
                <FotoItem
                  photos={this.state.photos}
                  refresh={this.refreshPhotosInGallery}
                  navigation={this.props.navigation}
                  selectPhoto={this.selectPhoto}
                  photo={item}
                  numColumns={this.state.numColumns}
                  selected={this.state.photosToDelete.includes(item.id)}
                />
              )}
            />
          </View>
        </View>
        :
        <ActivityIndicator size="large" color="#ff0000" />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    backgroundColor: "transparent",
    margin: 15
  },
  btTxt: {
    fontSize: 15
  },
  flatList: {
    flex: 11,
    padding: 3
  }
});

export default Screen2;
