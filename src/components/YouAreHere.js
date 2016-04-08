import React, { 
  Component, 
  View, 
  Text, 
  StyleSheet
} from 'react-native';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Colors from '../constants/Colors';

export default class YouAreHere extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
 
  render() {
    return (
      <View style={styles.youarehere} >
        <Text style={{marginLeft:20, fontSize:12}}>Your are here:</Text>
        { this.props.scene && 
          <Text style={{marginLeft:20, fontSize:12, fontWeight:'bold'}}>
            > {this.props.scene}
          </Text>
        }      
        { this.props.component && 
          <Text style={{marginLeft:40, fontSize:12, fontWeight:'bold'}}>
            >> {this.props.component}
          </Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  youarehere: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderTopColor: Colors.WHITE,
    borderTopWidth: 2,
    left: 0,
    top: 0,
    right: 0,
    height: 55,
    flex:1,
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
})

YouAreHere.propTypes = {
  scene: React.PropTypes.string.isRequired,
  component: React.PropTypes.string.isRequired
}
