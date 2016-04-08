import React, { 
  Component, 
  View, 
  Text, 
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Colors from '../constants/Colors';

export default class Footer extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  
  render() {
    let { handleOnPress, smallText, bigText } = this.props;
    return (
      <TouchableWithoutFeedback onPress={handleOnPress}>
        <View style={styles.bottomBox} >
          <Text style={{textAlign:'right', fontSize:12, flex:0.6}}>{smallText}</Text>
          <Text style={{textAlign:'left', fontSize:12, fontWeight:'bold', flex:0.4}}>{bigText}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  bottomBox: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderTopColor: Colors.WHITE,
    borderTopWidth: 2,
    left: 0,
    bottom: 0,
    right: 0,
    height: 50,
    flex:1,
    flexDirection: 'row',
    alignItems: 'center'
  }
})

Footer.propTypes = {
  handleOnPress: React.PropTypes.func.isRequired,
  smallText: React.PropTypes.string.isRequired,
  bigText: React.PropTypes.string.isRequired
} 