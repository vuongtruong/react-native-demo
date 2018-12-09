import React from 'react';
import {
    View,
    Text,
    Button,
    Image,
    ImageBackground,
    StyleSheet,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import YouTube from 'react-native-youtube';
// import BackLink from '../../container/core/back-link';

const textProps = {
    numberOfLines: 1
};

export const Detail = function(props) {
    return (
        <ScrollView style={{flex: 1, flexDirection: 'column'}}>{/*This is Main View*/}
            
            {
                props.show_loading ? (<ActivityIndicator size="large" color="#214158" style={{marginTop: 5}} />) : (
                    <View style={styles.main_container}>
                        <View style={styles.video_wrapper}>
                            <View style={styles.flex_row}>
                                
                                <View style={{flex: 1}}></View>
                                <View style={{width: 80, paddingRight: 20}}>
                                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                        
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{height: 20, marginBottom: 10}}>
                            <Text style={{flex: 1, textAlignVertical: 'center', color: "#214158", fontWeight: '600', fontSize: 16}}>{props.video.speaker}</Text>
                        </View>
                        <ImageBackground source={{uri: props.video.feature_image}} style={{height: 220}}></ImageBackground> 
                        <YouTube videoId={props.video.video_id} style={{height: 220}} play={true} fullscreen={false} loop={true} apiKey="AIzaSyBq3SszdRXfhIxRZFI_6CBACRjv_2b6CE0" />
                        <View style={styles.tab_wrapper}>
                            <View style={styles.flex_row}>
                                <View style={styles.tab_active}><Text style={styles.tab_title}>Info</Text></View>
                                <View style={styles.tab_inactive}><Text style={styles.tab_title_inactive}>Comments</Text></View>
                            </View>
                        </View>
                        <View style={styles.video_info_wrapper}>
                            <View style={[styles.info_item_row, styles.info_item_row_text_wrap]}>
                                <Text style={styles.info_title}>Title:</Text>
                                <Text style={styles.info_value}>{props.video.title}</Text>
                            </View>
                            <View style={styles.info_item_row}>
                                <Text style={styles.info_title}>Speaker:</Text>
                                <Text style={styles.info_value} {...textProps}>{props.video.speaker}</Text>
                            </View>
                            <View style={[styles.info_item_row, styles.info_item_row_text_wrap]}>
                                <Text style={styles.info_title}>Topic:</Text>
                                {/* <Text style={styles.info_value}>{props.video.category_text}</Text> */}
                            </View>
                            <View style={styles.info_item_row}>
                                <Text style={styles.info_title}>Length:</Text>
                                <Text style={styles.info_value} {...textProps}>{props.video.length}</Text>
                            </View>
                            <View style={styles.info_item_row}>
                                <Text style={styles.info_title}>Date:</Text>
                                <Text style={styles.info_value} {...textProps}>{props.video.create_date}</Text>
                            </View>
                            <View style={styles.info_item_row}>
                                <Text style={[styles.info_title, styles.text_narrow]}>In Dedication of:</Text>
                                <Text style={styles.info_value} {...textProps}>{props.video.in_dedication_of}</Text>
                            </View>
                            <View style={styles.info_item_row}>
                                <Text style={[styles.info_title, styles.text_narrow]}>In Celebration of:</Text>
                                <Text style={styles.info_value} {...textProps}>{props.video.in_celebration_of}</Text>
                            </View>
                        </View>
                    </View>
                )
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    main_container: {flex: 1, flexDirection: 'column', paddingLeft: 10, paddingRight: 10},
    video_wrapper: {height: 32, marginTop: 10},
    flex_row: {flex: 1, flexDirection: 'row'},
    video_info_wrapper: {marginTop: 10},
    info_item_row: {height: 26, flexDirection: 'row'},
    info_title: {fontSize: 16, fontWeight: '500', width: 110, textAlignVertical: 'center'},
    text_narrow: {letterSpacing: -1},
    info_value: {fontSize: 16, fontWeight: '400', textAlignVertical: 'center', flex: 1},
    tab_active: {flex: 1, backgroundColor: "#214158"},
    tab_inactive: {flex: 1, backgroundColor: "#e0e0e0"},
    tab_title: {color: "#ffffff", flex: 1, textAlign: "center", textAlignVertical: "center", fontSize: 16},
    tab_title_inactive: {color: "#ffffff", flex: 1, textAlign: "center", textAlignVertical: "center", fontSize: 16},
    tab_wrapper: {height: 32, marginTop: 10},
    info_item_row_text_wrap: {height: null, minHeight: 26}
});