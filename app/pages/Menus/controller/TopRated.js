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


export default class TopRated extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      toprated:[{}]
    };
    this.updateState = this.updateState.bind(this);
  }
  
  static navigationOptions = {
    title: 'Top Rated',
  }

  componentWillMount() {
    ParseUtil.getTopRated(this.updateState);
  }

  updateState(topratedResults) {
    this.setState({
      toprated:topratedResults
    })
 }

 renderItems() {
  return this.state.toprated.map((item, key) => {
      return (
     <Page  key={key}
        title={item.name}
        phone={item.phone}
        description={item.description}
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