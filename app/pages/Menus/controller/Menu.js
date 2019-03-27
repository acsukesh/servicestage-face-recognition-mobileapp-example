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

import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';

import Login from '../../../Login';
import ParseUtil from '../../../data/ParseUtil';
import UploadPhoto from '../../../UploadPhoto';

export default class Menu extends React.Component {
   render() {
    const { navigation: { navigate } } = this.props;
    return (
      <ScrollView>
        <View style={styles.container}>
        <ListItem
            underlayColor='transparent'
            title='Home'
            onPress={() => navigate('About')}
          />
          <ListItem
            underlayColor='transparent'
            title='Restaurants'
            onPress={() => navigate('Restaurants')}
          />
          <ListItem
            underlayColor='transparent'
            title='Top Rated'
            onPress={() => navigate('TopRated')}
          />
          <ListItem
            underlayColor='transparent'
            title='Offers'
            onPress={() => navigate('Offers')}
          />
           <ListItem
            underlayColor='transparent'
            title='Contact'
            onPress={() => navigate('Contact')}
          />
          <ListItem
            underlayColor='transparent'
            title='Upload Photo'
            onPress={() => navigate('UploadPhoto')}
          />
          <ListItem
            underlayColor='transparent'
            title='Logout'
            onPress={() => {
              Alert.alert(
                'Logout',
                'Are you sure to Logout?',
                [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'OK', onPress: () => 
                  {
                  ParseUtil.logout();
                  Login.navigationOptions.header = null;
                  navigate('Login')
                }
                },
                ],
                { cancelable: false }
              )

            }}
          />
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