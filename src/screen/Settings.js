import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }
  onNavigatorEvent = event => {
    console.log("Settings event");
    console.log(event);
    if(event.type === "NavBarButtonPress"){
      if(event.id === "sideDrawerToggle"){
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }else if (event.type == 'DeepLink') {
      const parts = event.link;
      if (parts == 'settingScreen') {
        this.onPressScreen1();
      }
    }
  }
  onPressScreen1() {
    this.props.navigator.push({
      title: "Settings",
      screen: "settingScreen"
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Settings</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
