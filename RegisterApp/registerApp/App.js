import { createStackNavigator, createAppContainer } from "react-navigation";
import EnterScreen from "./components/EnterScreen";
import AdminPageScreen from "./components/AdminPageScreen";
import EditScreen from "./components/EditScreen";

const Root = createStackNavigator({
  s1: { screen: EnterScreen },
  s2: { screen: AdminPageScreen },
  s3: { screen: EditScreen }
});

const App = createAppContainer(Root);

export default App;
