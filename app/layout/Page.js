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
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default Page = ({
  title,
  source,
  description,
  phone,
}) => (
  <View>
    <Text style={styles.title}>{title}</Text>
    <Image
      resizeMode='contain'
      source={{uri:source}}
      style={styles.image}
    />
    <Text style={styles.description}>{description}</Text>
    <Text style={styles.phone}>{phone}</Text>
  </View> 
)

const styles = StyleSheet.create({
  title: {
    fontFamily: 'sans-serif-medium',
    fontSize: 30,
    marginTop: 6,
    marginLeft: 10,
    marginBottom: -4,
  },
  description: {
    fontFamily: 'sans-serif-condensed',
    fontSize: 14,
    marginLeft: 10,
  },
  image: {
    height: 220,
    width,
  },
  phone: {
    fontFamily: 'sans-serif-medium',
    fontSize: 28,
    marginLeft: 10,
    marginBottom: 10,
  }
})