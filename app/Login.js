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
  Dimensions,
  CameraRoll,
  Alert
} from 'react-native';

import ParseUtil from './data/ParseUtil'
import CameraScreen from './CameraScreen.js';
import OpenCamera from './OpenCamera.js';
import ViewPhotos from './ViewPhotos';


const { width } = Dimensions.get('window');

export default class Login extends Component {
  static navigationOptions = {
    title : 'LOGIN',
    headerStyle: {
      backgroundColor: '#00a0fe',
    },
    headerTintColor: 'white',
    headerTitleStyle: { 
      textAlign:"center", 
      flex:1,
      fontSize: 15,
    },
  };

  state = {
    showPhotoGallery: false,
    showCamera: false,
    photoArray: []
  }

  constructor(props) {
    super(props);
    state = {
      user   : '',
      password: ''
    }
    this.loginState = this.loginState.bind(this);
  }

  onClickListener = (viewId) => {

    if(viewId == "login")
    {
   const { user, password } = this.state;
   
   ParseUtil.login(user,password, this.loginState);
    }
    else if(viewId == "signup")
    {
      this.props.navigation.navigate('Signup');
    }
    else if(viewId == "mbaas")
    {
      this.props.navigation.navigate('Mbaas');
    }
  }

  loginState(result) {
    console.log('callback : '+result);
    if(result == "success")
    {
      this.props.navigation.navigate('Menu');
    }
    else if(result == "faceFailed")
    {
      this.setState({ showPhotoGallery: false, showCamera: false})
    }
    else
    {
    Alert.alert("Error", "Login Failed."+result);
    }
  }

  getPhotosFromGallery() {
    CameraRoll.getPhotos({ first: 1000000 })
      .then(res => {
        let photoArray = res.edges;
		    this.setState({ showPhotoGallery: true, photoArray: photoArray })
      })
  }

  openCamera()
  {
    this.setState({ showCamera: true})
  }
  
  render() {
    if (this.state.showPhotoGallery) {
      return (
        <ViewPhotos
          photoArray={this.state.photoArray} faceUpload="false" redirect={this.loginState}/>
      )
    }

    if (this.state.showCamera) {
      return (
        <OpenCamera redirect={this.loginState}/>
      )
    }
    
    return (
      <View style={styles.container}>
        <Image
          resizeMode='contain'
          style={styles.logo}
          source={require('./res/logo.png')}
        />

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

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
        
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.openCamera()}>
          <Text style={styles.loginText}>Capture Photo to Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.getPhotosFromGallery()}>
          <Text style={styles.loginText}>Upload Photo to Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('signup')}>
            <Text>Signup</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('mbaas')}>
            <Text>Update MBaaS Info</Text>
        </TouchableHighlight>
        <Text style={{marginTop:20 , marginLeft:10, fontWeight:'bold', color: 'red'}} >All user accounts share the same image library for demo purpose. Please check tutorial for details.</Text>

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
  logo: {
    width: width - 100,
    maxHeight: 100,
    marginBottom:20
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
    height:35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    width:250,
    borderRadius:20,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});