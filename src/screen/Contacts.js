import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }
  onNavigatorEvent = event => {
    console.log("contact event");
    console.log(event);
    if(event.type === "NavBarButtonPress"){
      if(event.id === "sideDrawerToggle"){
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }else if (event.type == 'DeepLink') {
      const parts = event.link;
      if (parts == 'contacts') {
        this.onPressScreen1();
      }
    }
  }
  onPressScreen1() {
    this.props.navigator.push({
      title: "Screen 1",
      screen: "contacts"
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
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
