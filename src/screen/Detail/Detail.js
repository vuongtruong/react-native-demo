import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import axios from 'axios';
import {Detail} from './../../components/UI/Detail/Detail';


class DetailController extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.state = {
        id: props.id,
        show_loading: true,
        video: {}
    };
  }
  onNavigatorEvent = event => {
    if(event.type === "NavBarButtonPress"){
      if(event.id === "sideDrawerToggle"){
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  }
  async componentDidMount() {
    await axios.get('http://demo2.younetco.com/ctadlib/behereandbeyond/wp-json/wp/v2/videos/'+this.state.id)
    .then(res => {
        const video = res.data;
        //video.category_text = getCategories(video.categories);
        this.setState({video});
        this.setState({show_loading: false})
    })
    .catch(error => {
        this.setState({show_loading: false});
        Alert.alert('Cannot load data from server.');
    });
}
  render() {
    return (
      <Detail show_loading={this.state.show_loading} video={this.state.video}/>
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
});

export default DetailController;