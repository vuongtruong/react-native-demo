import React, { Component } from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';

import DefaultInput from  '../DefaultInput/DefaultInput';

const placeInput = props => (
    <DefaultInput
    placeholder="Place Name"
    value={props.placeData.value}
    valid={props.placeData.valid}
    touched={props.placeData.touched}
    onChangeText={props.onChangeText}
  />
);

export default placeInput