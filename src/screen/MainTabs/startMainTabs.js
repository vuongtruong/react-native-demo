import { Navigation } from 'react-native-navigation';
import  { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? 'md-map' : 'ios-map', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-share-alt' : 'ios-share', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30)
    ]).then(source => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: 'recent.RecentScreen',
                    label: 'Recent',
                    title: 'Recent',
                    icon: source[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: source[2],
                                title: 'Menu',
                                id: 'sideDrawerToggle'
                            }
                        ]
                    }
                },
                {
                    screen: "awesome-places.SharePlaceScreen",
                    label: "Contacts",
                    title: "Share a Places",
                    icon: source[1],
                    navigatorButtons:{
                        leftButtons: [
                            {
                                icon: source[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                }
            ],
            tabsStyle: { 
                tabBarButtonColor: '#ffff00', 
                tabBarSelectedButtonColor: '#ff9900', 
                tabBarBackgroundColor: '#551A8B', 
                initialTabIndex: 1, 
            },
            appStyle: {
                orientation: 'portrait', 
                bottomTabBadgeTextColor: 'red', 
                bottomTabBadgeBackgroundColor: 'green', 
            },
            drawer: {
                left: {
                    screen: "awesome-places.SideDrawer"
                }
            },
        });
    });
};
export default startTabs;