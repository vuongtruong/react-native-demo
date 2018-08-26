import React from 'react';
import {Text, StyleSheet} from 'react-native';

const HeadingText = props =>(
    <Text {...props} style={[style.textHeading, props.style]}>{props.children}</Text>
);
const style = StyleSheet.create({
    textHeading: {
        fontSize: 28,
        fontWeight: "bold"
    }
});

export default HeadingText;