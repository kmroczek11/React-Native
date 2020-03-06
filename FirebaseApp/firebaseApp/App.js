import { createStackNavigator, createAppContainer } from "react-navigation";
import LoadingScreen from "./components/LoadingScreen";
import WelcomeScreen from "./components/WelcomeScreen.js";
import RegisterScreen from "./components/RegisterScreen.js";
import LoginScreen from "./components/LoginScreen.js";
import StationsScreen from "./components/StationsScreen.js";
import MapScreen from "./components/MapScreen.js";

const Root = createStackNavigator({
  WelcomeScreen: { screen: WelcomeScreen },
  LoadingScreen: { screen: LoadingScreen },
  StationsScreen: { screen: StationsScreen },
  RegisterScreen: { screen: RegisterScreen },
  LoginScreen : { screen: LoginScreen},
  MapScreen: { screen: MapScreen }
});

const App = createAppContainer(Root);

export default App;
