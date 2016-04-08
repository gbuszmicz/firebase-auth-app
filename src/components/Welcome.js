import React, { 
  View, 
  StyleSheet,
  Text
} from 'react-native';
import Colors from '../constants/Colors';
import YourAreHere from '../components/YouAreHere';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Welcome extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    let { user } = this.props;
    return (
      <View style={styles.container}>
        <YourAreHere
          scene={'src/scenes/Home.js'}
          component={'src/components/Welcome.js'}
        />
        <Text style={styles.welcome}>
          This is a private area
        </Text>
        <Text style={ styles.instructions }>
          You are authenticated as:
        </Text>
        <Text style={ styles.username }>
          {user.firstname}{'\n'}
        </Text>
        <Text style={ styles.instructions }>
          You can close this app and you will still be authenticated next time you open it.
          Try it!
        </Text>
        <Text style={styles.linkText} onPress={this.props.handleLogout}>
          Logout
        </Text>
        <Text style={styles.linkText} onPress={this.props.hanldeRemoveAccount}>
          Remove the account
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GREY
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: Colors.DARK_GREY,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10
  },
  button: {
    marginTop: 50,
    backgroundColor: Colors.GREEN,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    paddingLeft: 30,
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 8
  },
  username: {
    fontWeight: 'bold', 
    color: Colors.BLACK, 
    marginTop: -10,
    fontSize: 16
  },
  linkText: {
    fontSize:14, 
    color:'#0077CC', 
    textAlign:'right',
    marginTop:10
  }
});

Welcome.propTypes = {
  user: React.PropTypes.object.isRequired,
  handleLogout: React.PropTypes.func.isRequired,
  hanldeRemoveAccount: React.PropTypes.func.isRequired
}