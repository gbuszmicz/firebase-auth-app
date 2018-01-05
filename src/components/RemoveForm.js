import React, { 
  View, 
  Text,
  TextInput, 
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Colors from '../constants/Colors';
import YourAreHere from '../components/YouAreHere';
import Dimensions from 'Dimensions';
const { width } = Dimensions.get('window');

export default class RemoveForm extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    this.state = { 
      password: '',
      emptyPasswordInput: false,
      passwordPlaceholder: 'Password'
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  // User is typing his/her password
  handlePasswordChange(password) {
    this.setState({ 
      password, 
      emptyPasswordInput: false,
      passwordPlaceholder: 'Password'
    });
  }

  // Validate password before proceed. Then callback to remove (../scenes/Remove.js)
  validatePassword() {
    if(this.state.password == '') { 
      this.setState({ 
        emptyPasswordInput: true,
        passwordPlaceholder: 'Password cannot be empty'
      });
    }
    if(!this.state.emptyPasswordInput) 
      this.props.handleRemoveAccount(this.state.password)
  }

  render() {
    let { isFetching, handleHomeRoute } = this.props;
    return (
      <View style={styles.container}>
        <YourAreHere
          scene={'src/scenes/Remove.js'}
          component={'src/components/RemoveAccount.js'}
        />
        <Text style={{ fontSize:16, textAlign:'center', fontWeight:'bold' }}>
          Remove account
        </Text>
        <Text style={styles.welcome}>
          Please enter your password
        </Text>
        <View style={[styles.inputContainer, this.state.emptyPasswordInput && styles.emptyInput]}>
          <TextInput
            style={styles.input}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder={this.state.passwordPlaceholder}
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType={'default'}
            placeholderTextColor={this.state.emptyPasswordInput ? Colors.RED : Colors.MEDIUM_GREY} 
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleHomeRoute}>
          <Text style={{ color: Colors.WHITE }}>No no no, cancel!</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, {backgroundColor:Colors.RED, marginTop:10 }]} 
          onPress={this.validatePassword}
        >
          <Text style={{ color: Colors.WHITE }}>
            {isFetching ? 'Removing user ... wait ...' : 'Ok yes, remove it!'}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BLUE_BG
  },
  welcome: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10
  },
  input: {
    position: 'relative',
    left: 10,
    top: 0,
    right: 0,
    height: 40,
    fontSize: 14,
    color: Colors.GREY       
  },
  button: {
    backgroundColor: Colors.DARK_GREY,
    padding: 10,
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 8,
    marginTop: 20,
    width: (width * 0.8)
  },
  inputContainer: {
    backgroundColor: Colors.WHITE,
    borderColor: Colors.WHITE,
    borderWidth: 2,
    borderRadius: 8,
    marginTop: 5,
    marginLeft: (width * 0.1),
    marginRight: (width * 0.1)
  },
  emptyInput: {
    borderColor: Colors.RED
  }
});

RemoveForm.propTypes = {
  handleHomeRoute: React.PropTypes.func.isRequired,
  handleRemoveAccount: React.PropTypes.func.isRequired,
  isFetching: React.PropTypes.bool.isRequired
}