import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity, Platform } from 'react-native';

import MainText from '../../components/UI/MainText/MainText';
import HeaderText from '../../components/UI/HeadingText/HeadingText';
import PlaceInput from '../../components/UI/PlaceInput/PlaceInput';
import { addPlace } from '../../store/actions/places';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import PickImage from '../../components/UI/PickImage/PickImage';
import PickLocation from '../../components/UI/PickLocation/PickLocation';
import validate from '../../utils/validation'

class SharePlaceScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controls: {
                placeName: {
                    value: "",
                    valid: false,
                    touched: false,
                    validationRules: {
                        notEmpty: true
                    }
                },
                oImage: {
                    value: null,
                    valid: false
                },
                oLocation: {
                    value: null,
                    valid: false,
                }
            }
        };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }
    onNavigatorEvent = event => {
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        } else if (event.type === "DeepLink") {
            if (event.link === "Weathers") {
                this.onPushScreen();
            } else if (event.link === "topicScreen") {
                this.onPressScreen1();
            } else if (event.link === "recent.RecentScreen") {
                this.onPressScreenRecents();
            } else if (event.link === "settingScreen") {
                this.onPressScreenSetting();
            }
        }
    }
    onPressScreenRecents() {
        this.props.navigator.push({
            title: "Recents",
            screen: "recent.RecentScreen"
        });
    }
    onPressScreen1() {
        this.props.navigator.push({
            title: "Topics",
            screen: "topicScreen"
        });
    }
    onPressScreenSetting() {
        this.props.navigator.push({
            title: "Setting",
            screen: "settingScreen"
        })
    }
    onPushScreen() {
        Promise.all([
            Icon.getImageSource(Platform.OS === 'android' ? 'md-map' : 'ios-map', 30),
            Icon.getImageSource(Platform.OS === 'android' ? 'md-share-alt' : 'ios-share', 30),
            Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30)
        ]).then(source => {
            this.props.navigator.push({
                title: "Weathers",
                screen: "Weathers",
                navigatorButtons: {
                    leftButtons: [
                        {
                            icon: source[2],
                            title: 'Menu',
                            id: 'sideDrawerToggle'
                        }
                    ]
                }
            });
        });
    }


    imagePickedHandler = image => {
        this.setState(prevState => {
            console.log(image);
            console.log(`prevstate ${JSON.stringify(prevState)}`);
            return {
                controls: {
                    ...prevState.controls,
                    oImage: {
                        value: image,
                        valid: true
                    }
                }
            };
        });
    }
    locationPickedHandler = location => {
        this.setState(prevState => {
            console.log(location);
            console.log(`prevState ${JSON.stringify(prevState)}`);
            return {
                controls: {
                    ...prevState.controls,
                    oLocation: {
                        value: location,
                        valid: true
                    }
                }
            }
        });
    }
    placeNameChangedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: val,
                        valid: validate(val, prevState.controls.placeName.validationRules),
                        touched: true
                    }
                }
            };
        });
    }

    render() {
        return (

            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeaderText>Share a Place with us!</HeaderText>
                    </MainText>
                    <PickImage onImagePicked={this.imagePickedHandler} />
                    <PickLocation onLocationPick={this.locationPickedHandler} />
                    <PlaceInput
                        placeData={this.state.controls.placeName}
                        onChangeText={this.placeNameChangedHandler}
                    />
                </View>
            </ScrollView>

        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    button: {
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
export default SharePlaceScreen;