import {createStackNavigator, createAppContainer } from "react-navigation";
import WelcomeScreen from "./components/WelcomeScreen"
import GalleryScreen from "./components/GalleryScreen"
import CameraScreen from "./components/CameraScreen"
import BigPhoto from "./components/BigPhoto"

const Root = createStackNavigator({
  WelcomeScreen: { screen: WelcomeScreen },
  GalleryScreen: { screen: GalleryScreen },
  CameraScreen: { screen: CameraScreen },
  BigPhotoScreen: { screen: BigPhoto }
});

const App = createAppContainer(Root);

export default App;