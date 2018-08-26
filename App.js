import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';

import AuthScreen from './src/screen/Auth/Auth';
import SideDrawer from './src/screen/SideDrawer/SideDrawer';
import Contact from './src/screen/Contacts';
import Weathers from './src/screen/Weathers';
import SharePlaceScreen from './src/screen/SharePlace/SharePlace';
import RecentScreen from './src/screen/Recent/Recent';
import configureStore from './src/store/configureStore';

const store = configureStore();
// Register Screens
Navigation.registerComponent(
    "awesome-places.AuthScreen", 
    () => AuthScreen,
    store,
    Provider
);
Navigation.registerComponent(
    "contacts",
    () => Contact,
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
// Start a App
Navigation.startSingleScreenApp({
    screen: {
        screen: "awesome-places.AuthScreen",
        title: "Login",
    }
});