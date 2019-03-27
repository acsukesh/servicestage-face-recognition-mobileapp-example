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
  AppRegistry,
  CameraRoll,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import Camera from 'react-native-camera';
import ParseUtil from './data/ParseUtil'
import RNFS from 'react-native-fs';
import Loader from './Loader';

export default class OpenCamera extends Component {

    constructor(props) {
      super(props);
      this.state = {
        cameraType: 'front',
        mirrorMode: false,
        loading: false
      };
      this.waitingState = this.waitingState.bind(this);
    }

    waitingState() {
      this.setState({ loading: false})
    }
    render() {
      return (
        <View style={styles.container}>
         <Loader
          loading={this.state.loading} />
          <Camera
            ref={cam => {
              this.camera = cam;
            }}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}
            captureTarget={Camera.constants.CaptureTarget.disk}
            type={this.state.cameraType}
            mirrorImage={this.state.mirrorMode}
          >
            <Text style={styles.capture} onPress={this.takePicture.bind(this)}>
              [CAPTURE]
            </Text>
            <Text
              style={styles.capture}
              onPress={this.changeCameraType.bind(this)}
            >
              [SWITCH CAMERA]
            </Text>
          </Camera>
        </View>
      );
    }
  
    changeCameraType() {
      if (this.state.cameraType === 'back') {
        this.setState({
          cameraType: 'front',
          mirrorMode: true
        });
      } else {
        this.setState({
          cameraType: 'back',
          mirrorMode: false
        });
      }
    }
   
    takePicture() {
      this.camera
        .capture()
        .then(data => {
          RNFS.readFile(data.path, 'base64')
          .then(res =>{
          ParseUtil.retrieveImage(res,this.props.redirect,this.waitingState); 
          });
        })
        .catch(err => console.error(err));
        this.setState({ loading: true})
    }
    
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      color: '#000',
      padding: 10,
      margin: 40
    }
  });
  
  AppRegistry.registerComponent('OpenCamera', () => OpenCamera);