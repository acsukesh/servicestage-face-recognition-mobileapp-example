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
import React from 'react';
import { Text, Image, View, StyleSheet, Dimensions } from 'react-native';

import { FormLabel, FormInput, Button } from 'react-native-elements';

const { width } = Dimensions.get('window');

export default class Contact extends React.Component {

  state = {
    name: '',
    email: '',
    message: '',
  }

  updateFormInput = (type, value) => {
    this.setState({
      [type]: value,
    });
  }

  sendMessage = () => {
    this.setState({
      name: '',
      email: '',
      message: '',
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image resizeMode='contain' style={styles.logo} source={require('../../res/logo.png')} />
        </View>
        <Text style={styles.title}>Contact Us</Text>
        <FormLabel>Name</FormLabel>
        <FormInput value={this.state.name} onChangeText={(text) => this.updateFormInput('name', text)} />
        <FormLabel>Email</FormLabel>
        <FormInput value={this.state.email} onChangeText={(text) => this.updateFormInput('email', text)} />
        <FormLabel>Message</FormLabel>
        <FormInput value={this.state.message} onChangeText={(text) => this.updateFormInput('message', text)} />
          
        <Button
          onPress={this.sendMessage}
          title="Submit"
          large
          backgroundColor="#fe0000"
          buttonStyle={styles.button}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    marginLeft: 20,
    fontFamily: 'sans-serif-Light',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  logoContainer: {
    maxHeight: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 170,
    maxHeight: 40
  },
  button: {
    marginTop: 20
  }
})