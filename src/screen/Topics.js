import React from 'react';
import {
  Text, View, Button,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/EvilIcons';

export default class Topics extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.state = {
      topics: [],
      show_loading: true
    }
  }
  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    } else if (event.type == 'DeepLink') {
      const parts = event.link;
      if (parts == 'contacts') {
        this.onPressScreen1();
      }
    }
  }
  onPressScreen1() {
    this.props.navigator.push({
      title: "Contacts",
      screen: "contacts"
    });
  }

  async componentDidMount() {
    await axios.get('http://demo2.younetco.com/ctadlib/behereandbeyond/wp-json/wp/v2/category')
      .then(res => {
        const topics = res.data;
        this.setState({ topics });
        this.setState({ show_loading: false })
      })
      .catch(error => {
        displayAlert('Cannot load data from server. Please make sure you have internet connection.');
        this.setState({ show_loading: false })
      });;
  }

  render() {
    const TopicItem = (props) => (
      <View>
        <View style={styles.topic_wrapper}>
          <View style={styles.col_flex}><Text style={styles.topic_title}>{props.title}</Text></View>
          <View style={styles.col_90}><Text style={styles.topic_video_count}>{props.count} Videos</Text><Icon style={{ textAlignVertical: 'center' }} name="chevron-right" color="#214158" size={28} /></View>
        </View>
        <View style={styles.topic_divider}></View>
      </View>
    );
    return (
      <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 1, flexDirection: 'column', paddingLeft: 10, paddingRight: 10 }}>
          {this.state.topics.map(({ name, count, term_id }, index) => (
            <TopicItem title={name} count={count} id={term_id} key={index} />
          ))}
          {
            !this.state.topics.length && !this.state.show_loading && (<Text style={{ textAlign: 'center', paddingTop: 5 }}>No items found.</Text>)
          }
          {
            this.state.show_loading && (<ActivityIndicator size="large" style={{ paddingTop: 5 }} color="#214158" />)
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topic_wrapper: {minHeight: 68, flexDirection: 'row', alignItems: 'center',},
  topic_divider: {height: 1, backgroundColor: "#E0E0E0"},
  col_90: {width: 90, flexDirection: 'row'},
  col_flex: {flex: 1, flexDirection: 'row'},
  topic_title: {textAlignVertical: 'center', flex: 1, fontSize: 16, color: '#214158', fontWeight: '500'},
  topic_video_count: {textAlignVertical: 'center', flex: 1, textAlign: 'right'}
});
