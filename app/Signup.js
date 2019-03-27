/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  CameraRoll,
  Alert
} from 'react-native';

import ParseUtil from './data/ParseUtil'
import Login from './Login';

export default class Signup extends Component {

  static navigationOptions = {
    title : 'SIGNUP',
    header: null,
  };

  constructor(props) {
    super(props);
    state = {
      user   : '',
      password: '',
      email: '',
    }
    this.signupState = this.signupState.bind(this);
  }

  onClickListener = (viewId) => {
    if(viewId == "signup")
    { 
    const { user, password, email } = this.state;
    ParseUtil.signup(user,password,email,this.signupState);
    }
    else if(viewId == "cancel")
    {
    const { navigation: { navigate } } = this.props;
    Alert.alert(
        'Signup',
        'Are you sure to Cancel?',
        [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => 
        {
        
        Login.navigationOptions.header = null;
        navigate('Login')
        }
        },
        ],
        { cancelable: false }
        )
        }
  }

  signupState(result) {
    if(result == "success")
    {
    const { navigation: { navigate } } = this.props;
    Alert.alert(
        'Success',
        'Signup Success.',
        [
            {text: 'OK', onPress: () => 
            {
            Login.navigationOptions.header = null;
            navigate('Login')
        }
        },
        ],
        { cancelable: false }
        )
    }
    else
    {
    Alert.alert("Error", "Signup Failed."+result);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('./res/user.png')}/>
          <TextInput style={styles.inputs}
              placeholder="Username"
              keyboardType="default"
              underlineColorAndroid='transparent'
              onChangeText={(user) => this.setState({user})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('./res/pass.png')}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('./res/email.png')}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onClickListener('signup')}>
            <Text>Signup</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onClickListener('cancel')}>
            <Text>Cancel</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  signupButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});