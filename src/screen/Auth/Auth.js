import React, {Component} from 'react';
import {
    View,
    Text, 
    ImageBackground, 
    StyleSheet,
    Dimensions,
} from 'react-native';
import MainTabs from './../MainTabs/startMainTabs';
import MainText from './../../components/UI/MainTabs/MainTabs';
import HeadingText from './../../components/UI/HeadingText/HeadingText';
import ButtonWidthBackground from './../../components/UI/ButtonWidthBackground/ButtonWidthBackground';
import DefaultInput from './../../components/UI/DefaultInput/DefaultInput';
import backgroundImage from './../../assets/background.jpg';

class AuthScreen extends Component {
    state = {
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
    };
    constructor(props){
        super(props);
        Dimensions.addEventListener("change", this.updateStyles)
    }
    updateStyles = (dims)=>{
        this.setState({
            viewMode:
                dims.window.height > 500 ? "portrait" : "landscape"
        });
    }
    //Remove event
    componentWillUnmount(){
        Dimensions.removeEventListener("change", this.updateStyles);
    }
    loginHandler = () => {
        MainTabs();
    }
    render(){
        let headingText = null;
        if(this.state.viewMode === "portrait"){
            headingText =(
                <MainText>
                    <HeadingText style={{color:"#0000FF"}}>Please Log IN</HeadingText>
                </MainText>
            );
        }
        return (
            <ImageBackground source={backgroundImage} style = {styles.backgroundImage}>
                <View style={styles.container}>
                    {headingText}
                    <ButtonWidthBackground color="#29aaf4" onPress={()=>alert("Click")}>
                        Swich To Login
                    </ButtonWidthBackground>
                    <View style={styles.inputContainer}>
                        <DefaultInput placeholder="Your E-Mail Address" style={styles.input}/>
                        <View style={this.state.viewMode === "portrait" ? styles.portraitPasswordContainer : styles.landscapePasswordContainer}>
                            <View style={this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                                <DefaultInput placeholder="Password" style={styles.input}/>
                            </View>
                            <View style={this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                                <DefaultInput placeholder="Confirm Password" style={styles.input}/>
                            </View>
                        </View>
                    </View>
                    <ButtonWidthBackground color="#29aaf4" onPress={this.loginHandler}>
                        Submit
                    </ButtonWidthBackground>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    backgroundImage:{
        width: "100%",
        flex: 1,
    },
    inputContainer: {
        width: "80%",
    },
    input:{
        backgroundColor: "#eee",
        borderColor: "#bbb"
    },
    landscapePasswordContainer:{
        flexDirection: "row",
        justifyContent: "space-between"
    },
    portraitPasswordContainer: {
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    portraitPasswordWrapper:{
        width: "100%",
    },
    landscapePasswordWrapper:{
        width: "45%",
    }
});
export default AuthScreen;