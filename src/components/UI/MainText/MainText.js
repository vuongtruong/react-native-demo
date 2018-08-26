import React from 'react';
import {Text, StyleSheet} from 'react-native';

const MainText = props =>(
    <Text style={styles.mainText}>{props.childrent}</Text>
)

const styles = StyleSheet.create({
    mainText:{
        color: "black",
        backgroundColor: "transparent"
    }
})

export default MainText;