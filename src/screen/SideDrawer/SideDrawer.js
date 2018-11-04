import React, {Component} from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Dimensions,
    Platform,
} from "react-native";
import { Navigation } from 'react-native-navigation';
import Icon from "react-native-vector-icons/Ionicons";

class SideDrawer extends Component{
    constructor(props){
        super(props);
    }
    pushScreen = (type) => {
        this._toggleDrawer();
        this.props.navigator.handleDeepLink({link: "recent.RecentScreen"});
    };
    _toggleDrawer() {
        this.props.navigator.toggleDrawer({
            to: 'closed',
            side: 'left',
            animated: true
        });
	}

    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={this.pushScreen.bind(this)}>
                    <View style={styles.drawerItem}>
                        <Icon name="ios-log-out" size={30} color="#aaa" style={styles.drawerItemIcon} />
                        <Text>Contacts</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.pushScreen.bind(this)}>
                    <View style={styles.drawerItem}>
                        <Icon name="ios-log-out" size={30} color="#aaa" style={styles.drawerItemIcon} />
                        <Text>Recents</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.pushScreen.bind(this)}>
                    <View style={styles.drawerItem}>
                        <Icon name="ios-log-out" size={30} color="#aaa" style={styles.drawerItemIcon} />
                        <Text>News</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.pushScreen.bind(this)}>
                    <View style={styles.drawerItem}>
                        <Icon name="ios-log-out" size={30} color="#aaa" style={styles.drawerItemIcon} />
                        <Text>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: "white",
    },
    drawerItem:{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#eee"
    },
    drawerItemIcon:{
        marginRight: 10,
    }
});

export default SideDrawer;