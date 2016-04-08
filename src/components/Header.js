import React, { 
  Component, 
  Image, 
  View, 
  Text, 
  StyleSheet
} from 'react-native';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Colors from '../constants/Colors';

export default class Header extends Component {
  
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  
  render() {
    return (
      <View style={styles.header}>
        <Image style={{width:80, height:75}} 
          source={require('../assets/react-logo.png')} 
        />
        <Text style={styles.headerText}>Firebase login app</Text>
        <Text style={{ fontSize:12 }}>A simple authentication app with Firebase</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'flex-end',
    marginVertical: 5,
    alignItems: 'center',
    flex: 0.3,
    backgroundColor: 'transparent'
  },
  headerText: {
    color: Colors.GREY,
    fontSize: 20,
    marginTop: 0
  }
})