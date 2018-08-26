import React, { Component } from 'react';
import {View, Text, TextInput, Button, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';

import MainText from '../../components/UI/MainText/MainText';
import HeaderText from '../../components/UI/HeadingText/HeadingText';
import PlaceInput from '../../components/UI/PlaceInput/PlaceInput';
import { addPlace } from '../../store/actions/places';
import { connect } from 'react-redux';


class SharePlaceScreen extends Component {
    constructor(props){
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
        }else if(event.type === "DeepLink"){
            if(event.link === "Weathers"){
                this.onPushScreen();
            }
        }
      }
      onPushScreen() {
        this.props.navigator.push({
          title: "Screen 1",
          screen: "Weathers"
        });
      }
    state ={
        placeName: ""
    };
    placeNameChangeHandler = val => {
        this.setState({
            placeName: val
        });
    };
    placeAddedHandler = ()  =>{
        if(this.state.placeName.trim() !== ""){
            this.props.onAddPlace(this.state.placeName);
        }
    }
    itemSelectedHandler = (key) => {
        console.log("detail");
        console.log(key);
    }
    render(){
        return(
            
                <View style={styles.container}>
                    <PlaceInput 
                        placeName={this.state.placeName}  
                        onChangeText={this.placeNameChangeHandler}
                    />
                    <FlatList
                        style={styles.listContainer}
                        data={this.props.places}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(info) => (
                            <TouchableOpacity onPress={this.itemSelectedHandler(info.item.key)}>
                                <View style={styles.listItem}>
                                    <Image resizeMode="cover" source={info.item.image} style={styles.placeImage} />
                                    <Text>{info.item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        />
                    <View style={styles.button}>
                        <Button title="Share the Place!" onPress={this.placeAddedHandler} />
                    </View>
                </View>
            
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    button:{
        margin: 8
    },
    listContainer: {
        width: "100%"
    },
    listItem: {
        width: "100%",
        marginBottom: 5,
        padding: 10,
        backgroundColor: "#eee",
        flexDirection: "row",
        alignItems: "center"
    },
    placeImage: {
        marginRight: 8,
        height: 30,
        width: 30
    }
});
const mapStateToProps = state => {
    return {
      places: state.places.places
    };
  };
const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: placeName => dispatch(addPlace(placeName))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);