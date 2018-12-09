import React, { Component } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Dimensions,
    Platform,
    TextInput,
    TouchableHighlight,
    Alert,
    AlertIOS
} from "react-native";
import { Navigation } from 'react-native-navigation';
import Icon from "react-native-vector-icons/FontAwesome";

class SideDrawer extends Component {
    constructor(props) {
        super(props);
        this.pushScreen = this.pushScreen.bind(this);
    }
    pushScreen = (props) => {
        this._toggleDrawer();
        this.props.navigator.handleDeepLink({ link: props.to, params: { data: 1 } });
    };
    _toggleDrawer() {
        this.props.navigator.toggleDrawer({
            to: 'closed',
            side: 'left',
            animated: true
        });
    }
    onLogout(){
        this._toggleDrawer();
        Alert.alert(
            'Confirm',
            'Are you sure you want to log out?',
            [
                {text: 'Cancel', onPress: () => {}},
                {text: 'OK', onPress: () => {
                    Alert.alert("Logout success")
                }},
            ],
            { cancelable: false }
        );
    }
    render() {
        const MenuItem = (props) => {
            const align_left = props.alignIconLeft ? props.alignIconLeft : 0;
            return (
                <TouchableOpacity style={styles.menu_item_wrapper} onPress={()=>this.pushScreen(props)}>
                    <View style={styles.flex_row} >
                        <View style={styles.menu_item_icon__rounded}>
                            <View style={[styles.menu_item_icon__center, { paddingLeft: align_left }]}>
                                <Icon name={props.iconName} color="#214158" size={16} />
                            </View>
                        </View>
                        <Text style={styles.menu_item_text}>{props.title}</Text>
                    </View>
                </TouchableOpacity>
            )
        };

        const MenuGroup = (props) => (
            <View style={styles.menu_group}>
                <Text style={styles.menu_group__title}>{props.title}</Text>
            </View>
        );
        return (
            <View style={[styles.mainContainer, styles.flex_column]}>
                <View style={styles.searchWrapper}>
                    <View style={styles.search__view}>
                        <TextInput style={styles.search__input} placeholder="🔎 Search Lectures" autoCorrect={false} underlineColorAndroid="rgba(0,0,0,0)" />
                    </View>
                </View>
                <MenuGroup title="MENU" />
                <View style={styles.menu_group_content}>
                    <MenuItem title="Recent" to="recent.RecentScreen" iconName="play" alignIconLeft={3} />
                    <MenuItem title="Topics" to="topicScreen" iconName="list-ul" />
                    <MenuItem title="Settings" to="settingScreen" iconName="gear" alertMessage="This feature is under developing!" />
                </View>
                <MenuGroup title="ACCOUNT" />
                <TouchableHighlight style={styles.menu_item_wrapper} underlayColor="#d7d7d7" onPress={this.onLogout.bind(this)}>
                    <View style={styles.flex_row}>
                        <View style={styles.menu_item_icon__rounded}>
                            <View style={styles.menu_item_icon__center}>
                                <Icon name="lock" color="#214158" size={16} />
                            </View>
                        </View>
                        <Text style={styles.menu_item_text}>Logout</Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.menu_group_content}>
                    <MenuItem title="My Library" to="/library" iconName="film" alertMessage="This feature is under developing!" />
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#214158'
    },
    drawerItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#eee"
    },
    drawerItemIcon: {
        marginRight: 10,
    },
    flex_column: {
        flex: 1,
        flexDirection: 'column'
    },
    flex_row: {
        flex: 1,
        flexDirection: 'row'
    },
    searchWrapper: {
        height: 70
    },
    search__view: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 20 },
    search__input: { backgroundColor: '#ffffff', width: 180, height: 40, paddingLeft: 10 },
    menu_group: { height: 30, backgroundColor: '#d7d7d7', flexDirection: 'row', alignItems: 'center'},
    menu_group__title: { flex: 1, textAlignVertical: 'center', paddingLeft: 20, fontSize: 16, alignItems: 'center' },
    menu_group_content: { paddingTop: 10, paddingBottom: 10 },
    menu_item_wrapper: { paddingLeft: 20, height: 30, marginBottom: 5 },
    menu_item_icon__rounded: { width: 30, backgroundColor: '#ffffff', borderRadius: 15 },
    menu_item_icon__center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    menu_item_text: { fontSize: 16, color: '#ffffff', textAlignVertical: 'center', paddingLeft: 10 }
});

export default SideDrawer;