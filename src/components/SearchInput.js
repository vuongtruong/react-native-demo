import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default class SearchInput extends React.Component {
  state = {
    text: ''
  }
  handleChangeText = text =>{
    this.setState.text = text;
  }
  handleSubmitEditing = () =>{
    const {text} = this.setState;
    console.log("test");
    if(!text){
      return;
    }
    this.props.onSubmit(text);
    this.setState({
      text: '',
    });
  }
  render() {
    const {text} = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          value={text}
          placeholder={this.props.placeholder}
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          style={styles.textInput}
          clearButtonMode="always"
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.handleSubmitEditing}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: '#666',
    // marginHorizontal: 40,
    // paddingHorizontal: 10,
    width: "80%",
    borderRadius: 5,
    marginLeft: "10%"
  },
  textInput: {
    flex: 1,
    color: 'white',
    padding: "5%",
  },
});
