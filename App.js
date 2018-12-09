import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';

import AuthScreen from './src/screen/Auth/Auth';
import SideDrawer from './src/screen/SideDrawer/SideDrawer';
import TopicScreen from './src/screen/Topics';
import Setting from './src/screen/Settings';
import Weathers from './src/screen/Weathers';
import SharePlaceScreen from './src/screen/SharePlace/SharePlace';
import RecentScreen from './src/screen/Recent/Recent';
import DetailScreen from './src/screen/Detail/Detail';
import configureStore from './src/store/configureStore';
import Settings from './src/screen/Settings';

const store = configureStore();
// Register Screens
Navigation.registerComponent(
    "awesome-places.AuthScreen", 
    () => AuthScreen,
    store,
    Provider
);
Navigation.registerComponent(
    "topicScreen",
    () => TopicScreen,
    store,
    Provider
);
Navigation.registerComponent(
    "awesome-places.SideDrawer",
    () => SideDrawer
);
Navigation.registerComponent(
    "Weathers",
    () => Weathers,
    store,
    Provider
);
Navigation.registerComponent(
    "awesome-places.SharePlaceScreen",
    ()=> SharePlaceScreen,
    store,
    Provider
);
Navigation.registerComponent(
    "recent.RecentScreen",
    ()=>RecentScreen,
    store,
    Provider
);
Navigation.registerComponent(
    "DetailScreen",
    ()=>DetailScreen,
    store,
    Provider
);
Navigation.registerComponent(
    "settingScreen",
    ()=> Settings,
    store,
    Provider
);
// Start a App
Navigation.startSingleScreenApp({
    screen: {
        screen: "awesome-places.AuthScreen",
        title: "Login",
    }
});