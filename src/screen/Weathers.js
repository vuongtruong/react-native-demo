/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
  View
} from 'react-native';
 import getImageForWeather from './../utils/getImageForWeather';
 import SearchInput from './../components/SearchInput';
 import {fetchLocationId, fetchWeather} from './../utils/api'


export default class Weathers extends Component {
  state ={
    loading: false,
    error: false,
    location: '',
    temperature: 0,
    weather: '',
  };
  constructor(props){
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  onNavigatorEvent(event){
    if(event.type == "NavBarButtonPress"){
      if(event.id == "sideDrawerToggle"){
        this.props.navigator.toggleDrawer({
          side: "left",
          animated: true
        });
      }
    }
  }
  handleUpdateLocation = async city =>{
    if(!city) return;
    // console.log("submit");
    this.setState({loading: true,},
       async ()=>{
         try{
        const locationId = await fetchLocationId(city);
        const {location, weather, temperature} = await fetchWeather(locationId);
          // console.log("location");
          // console.log(location);
        this.setState({
          loading: false,
          error: false,
          location,
          temperature,
          weather,
        });
         }catch(err){
          this.setState({
            loading: false,
            error: true,
          });
         }
    }
  );
  }
  render() {
    const {loading, error, location, temperature, weather } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} >
        <StatusBar barStyle="light-content" />
        <ImageBackground  source={getImageForWeather('Clear')} style={styles.image}>
          <View style={styles.detailContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />
            {!loading && (
              <View>
                {error && (
                  <View>
                    <Text style={[styles.smallText, styles.textStyle]}>Could not loading weather, please try a different city.</Text>
                  </View>
                )}
                {!error && (
                  <View>
                    <Text style={[styles.largeText, styles.textStyle]}>{this.state.location}</Text>
                    <Text style={[styles.smallText, styles.textStyle]}>{this.state.weather}</Text>
                    <Text style={[styles.largeText, styles.textStyle]}>{this.state.temperature}</Text>
                  </View>
                )}
                <SearchInput placeholder="Search city" onSubmit={this.handleUpdateLocation}/>
              </View>
            )}
            
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%"
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  textInput: {
    backgroundColor: '#666',
    color: 'white',
    height: 40,
    width: 300,
    marginTop: 20,
    //marginHorizontal: 20,
    //paddingHorizontal: 10,
    alignSelf: 'center',
  },
  imageBack: {
    flex:1,
  },
  image: {
    flex:1,
    resizeMode: 'cover',
    width: "100%",
    height: "100%",
  },
  detailContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: "100%",
    //paddingHorizontal: 20,
  },
});
