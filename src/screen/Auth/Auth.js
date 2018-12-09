import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Dimensions,
    Alert
} from 'react-native';
import axios from 'axios';
import MainTabs from './../MainTabs/startMainTabs';
import MainText from './../../components/UI/MainTabs/MainTabs';
import HeadingText from './../../components/UI/HeadingText/HeadingText';
import ButtonWidthBackground from './../../components/UI/ButtonWidthBackground/ButtonWidthBackground';
import DefaultInput from './../../components/UI/DefaultInput/DefaultInput';
import backgroundImage from './../../assets/background.jpg';

class AuthScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
            email: null,
            password: null,
        };
        Dimensions.addEventListener("change", this.updateStyles);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }
    updateStyles = (dims) => {
        this.setState({
            viewMode:
                dims.window.height > 500 ? "portrait" : "landscape"
        });
    }
    //Remove event
    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
    }
    validatorEmail = (string) => {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         return re.test(string);
    }
    loginHandler = () => {
        return MainTabs();
        if(!this.state.email){
            return Alert.alert("Email does not empty!");
        }
        if(!this.validatorEmail(this.state.email)){
            return Alert.alert("Please enter valid email address!");
        }
        if(!this.state.password){
            return Alert.alert("Password does not empty!");
        }
        axios.post('http://demo2.younetco.com/goals/?m=lite&name=api2&delay=0&module=ynmobile&request=user/login', {
            sEmail: this.state.email,
            sPassword: this.state.password
        }).then(respone=>{
            if(respone['data']['error_message']){
                return Alert.alert(respone['data']['error_message']);
            }
            if(respone['data']){
                console.log("data:"+JSON.stringify(respone['data']));
                Alert.alert("Success");
                MainTabs();
            }
            
        }).catch(error => {
            console.log(error);
        })
        //Alert.alert("Success");
        // MainTabs();
    }
    onChangeEmail = (email) => {
        console.log("email"+ email);
        this.setState({ email });
    }
    onChangePassword = (password) => {
        this.setState({ password });
    }
    render() {
        let headingText = null;
        if (this.state.viewMode === "portrait") {
            headingText = (
                <MainText>
                    <HeadingText style={{ color: "#0000FF" }}>Please Log Out</HeadingText>
                </MainText>
            );
        }
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={styles.container}>
                    {headingText}
                    <ButtonWidthBackground color="#29aaf4" onPress={() => alert("Click")}>
                        Swich To Login
                    </ButtonWidthBackground>
                    <View style={styles.inputContainer}>
                        <DefaultInput placeholder="Your E-Mail Address" style={styles.input} onChangeField={this.onChangeEmail} />
                        <View style={this.state.viewMode === "portrait" ? styles.portraitPasswordContainer : styles.landscapePasswordContainer}>
                            <View style={this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                                <DefaultInput secureTextEntry={true} placeholder="Password" style={styles.input} onChangeField={this.onChangePassword} />
                            </View>
                            {/* <View style={this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                                <DefaultInput placeholder="Confirm Password" style={styles.input}/>
                            </View> */}
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
    backgroundImage: {
        width: "100%",
        flex: 1,
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        backgroundColor: "#eee",
        borderColor: "#bbb"
    },
    landscapePasswordContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    portraitPasswordContainer: {
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    portraitPasswordWrapper: {
        width: "100%",
    },
    landscapePasswordWrapper: {
        width: "45%",
    }
});
export default AuthScreen;