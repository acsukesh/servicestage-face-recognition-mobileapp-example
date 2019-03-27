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
import ParseUtil from '../../../data/ParseUtil'

import { ScrollView, View, StyleSheet } from 'react-native';

import Page from '../../../layout/Page';


export default class Offers extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      offers:[{}]
    };
    this.updateState = this.updateState.bind(this);
  }
  
  static navigationOptions = {
    title: 'Offers',
  }

  componentWillMount() {
    ParseUtil.getOffers(this.updateState);
  }

  updateState(offersResults) {
    this.setState({
      offers:offersResults
    })
 }

 renderItems() {
  return this.state.offers.map((item, key) => {
      return (
      <Page  key={key}
        source={item.image}
      />
      );
  });
}

render() {
  return (
    <ScrollView>
      <View style={styles.container}>
         {
              this.renderItems()
          }
      </View>
    </ScrollView>
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})