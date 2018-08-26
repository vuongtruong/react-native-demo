import React, {Component} from 'react';
import { View, Text } from 'react-native';

class Recent extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }
    onNavigatorEvent = event => {
        if(event.type === "NavBarButtonPress"){
            if(event.id === "sideDrawerToggle"){
            this.props.navigator.toggleDrawer({
                side: "left"
            });
            }
        }else if(event.type ==="DeepLink"){
            if(event.link === "Weathers"){
                this.onPushScreen();
            }
        }
    }
    onPushScreen() {
        this.props.navigator.resetTo({
            title: "Screen 1",
            screen: "contacts"
        });
    }
    render(){
        return(
            <View>
                <Text>Recent</Text>
            </View>
        )
    };
}

export default Recent;