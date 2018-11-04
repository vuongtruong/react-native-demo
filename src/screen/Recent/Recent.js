import React, {Component} from 'react';
import { View, Text, Alert, FlatList, ImageBackground, TouchableHighlight, StyleSheet, ActivityIndicator} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons'

const DEFAULT_PARAMS = {
    order: 'DESC',
    sort: 'date',
    per_page: 10
}
class Recent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            page: 1,
            refreshing: null,
            canLoadMore: true,
        }
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
        this.onLoadMoreHandler = this.onLoadMoreHandler.bind(this);
    }
    
    onNavigatorEvent = event => {
        if(event.type === "NavBarButtonPress"){
            if(event.id === "sideDrawerToggle"){
            this.props.navigator.toggleDrawer({
                side: "left"
            });
            }
        }else if(event.type ==="DeepLink"){
            if(event.link === "Weathers"){
                this.onPushScreen();
            }
        }
    }
    onPushScreen() {
        this.props.navigator.resetTo({
            title: "Screen 1",
            screen: "contacts"
        });
    }

    initFirstLoading() {
        this.loading = true;
        axios.get('http://demo2.younetco.com/ctadlib/behereandbeyond/wp-json/wp/v2/videos', { params: {
            page: this.state.page,
            ...DEFAULT_PARAMS,
            }
        })
        .then(res => {
            const videos = res.data;
            this.setState({videos});
            this.loading = false;
        })
        .catch(err => {
            Alert.alert('Warning', 'Cannot load data from server. Please make sure you have internet connection.', [ {text: "OK", onPress: () => {}},], { cancelable: false});
            this.setState({canLoadMore: false});
            this.loading = false;
        })
    }
    componentDidMount(){
        this.initFirstLoading();
    }
    async onLoadMoreHandler(){
        if(!this.state.canLoadMore) return false;
        if(this.loading) return false;
        let nextPage = this.state.page +1;
        this.setState({page: nextPage});
        this.loading = true;
        axios.get('http://demo2.younetco.com/ctadlib/behereandbeyond/wp-json/wp/v2/videos', { params: {
            page: nextPage,
            ...DEFAULT_PARAMS,
            }
        })
        .then(res => {
            const videos = res.data;
            if(!videos.length){
                this.setState({
                    canLoadMore: false
                });
            }
            this.setState({videos: [...this.state.videos, ...videos]});
            this.loading = false;
        })
        .catch(err => {
            //Alert.alert('Warning', 'Cannot load data from server. Please make sure you have internet connection.', [ {text: "OK", onPress: () => {}},], { cancelable: false});
            this.setState({canLoadMore: false});
            this.loading = false;
        })
        return true;
    }
    renderItem = ({item}) =>(
        <View>
            <View style={styles.video_item}>
                <View style={styles.flex_row}>
                    <View style={styles.video_thumbnail}>
                        <ImageBackground source={{uri: item.feature_image}} style={{flex: 1}}>
                        </ImageBackground>
                    </View>
                    <View style={styles.video_brief_detail}>
                        <Text numberOfLines={2} style={styles.video_title}>{item.title}</Text>
                        <Text>{item.speaker}</Text>
                        {/* <Text>{category_text}</Text> */}
                        <Text>{item.length}   {item.create_date}</Text>
                        {/* <TouchableHighlight style={{position: 'absolute', top: 5, right: 5, padding: 5}} onPress={()=>{this.onOpenActionSheet(props.id, props.index)}} underlayColor="transparent"><Icon name="dots-three-vertical" size={16} color="#000000"/></TouchableHighlight> */}
                        <TouchableHighlight style={{position: 'absolute', top: 5, right: 5, padding: 5}} underlayColor="transparent"><Icon name="dots-three-vertical" size={16} color="#000000"/></TouchableHighlight>
                    </View>
                </View>
            </View>
            <View style={styles.topic_divider}></View>
        </View>
    );
    render(){
        
        return(
            <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    {
                        !this.state.videos.length && !this.canLoadMore && (<Text style={{textAlign: 'center', paddingTop: 5}}>No more items;</Text>)
                    }
                    <FlatList  
                        data={this.state.videos} 
                        renderItem={this.renderItem} 
                        keyExtractor={item => item.id.toString()}
                        ListFooterComponent={
                            this.state.canLoadMore && <ActivityIndicator size="large" color="#214158" style={{marginTop: 5}}/>
                        }
                        onEndReached={this.onLoadMoreHandler}
                        onEndReachedThreshold={0.5}
                    />
                </View>
            </View>
        )
    };
}
const styles = StyleSheet.create({
    flex_row: {flex: 1, flexDirection: 'row'},
    video_item: {height: 110, backgroundColor: '#ffffff'},
    video_title: {fontSize: 16, fontWeight: '500', height: 40, color: '#214158', paddingRight: 20},
    video_thumbnail: {width: 140, padding: 10},
    video_brief_detail: {flex: 1, padding: 5, paddingLeft: 10},
    topic_divider: {height: 1, backgroundColor: "#E0E0E0"},
});
export default Recent;