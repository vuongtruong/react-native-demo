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
    pushScreen = () => {
        this._toggleDrawer();
        this.props.navigator.handleDeepLink({link: "Weathers"});
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