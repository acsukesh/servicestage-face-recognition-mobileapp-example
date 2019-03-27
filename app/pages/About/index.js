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
import { Linking, Text, Image, View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default About = () => (
  <View style={styles.container}>
    <Image
      resizeMode='contain'
      style={styles.logo}
      source={require('../../res/logo.png')}
    />
    <Text style={styles.title}>Welcome to Quick Eats</Text>
    <Text style={styles.subTitle}>Find the best restaurants, cafés, and bars </Text>
    <Text style={styles.customtitle}>BEST OFFERS</Text>
    <Text style={styles.customtitle1}>GUARANTEED</Text>
    <Text style={styles.customtitle2}>Get the best food near your location</Text>
    <Text style={styles.number} onPress={
      () => Linking.openURL('https://github.com/react-native-training')
        .then(() => console.log('calling'))
        .catch((err) => console.log('error: ', err))
    }>
      PH: 999.999.999
    </Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c9c9c9',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: width - 100,
    maxHeight: 100,
  },
  title: {
    fontFamily: 'sans-serif-Light',
    fontSize: 30,
  },
  subTitle: {
    fontFamily: 'sans-serif-Regular',
    fontSize: 16,
  },
  customtitle: {
    fontFamily: 'sans-serif-Light',
    fontSize: 45,
    color:'green',
    fontWeight: 'bold',
  },
  customtitle1: {
    fontFamily: 'sans-serif-Light',
    fontSize: 35,
    color:'yellow',
    fontWeight: 'bold',
  },
  customtitle2: {
    fontFamily: 'fs_sammyregular',
    fontSize: 25,
    color:'black',
  },
  number: {
    color: '#fe0000',
    fontFamily: 'sans-serif-Regular',
    fontSize: 15,
    marginTop: 10
  }
})