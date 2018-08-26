import React from 'react';
import {
    View,
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Platform,
    TouchableNativeFeedback,
} from 'react-native';

const ButtonWidthBackground = props => {
    const content = (
        <View style ={[styles.button, {backgroundColor: props.color}]} {...props}>
            <Text>{props.children}</Text>
        </View>
    );
    if(Platform.OS === 'android'){
        return (
            <TouchableNativeFeedback onPress={props.onPress}>
                {content}
            </TouchableNativeFeedback>
        );
    }
    return (
        <TouchableOpacity onPress={props.onPress}>
            {content}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button:{
        padding: 10,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "black",
    },
});

export default ButtonWidthBackground;