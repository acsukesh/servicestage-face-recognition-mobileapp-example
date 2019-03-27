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

import Menu from './controller/Menu';
import TopRated from './controller/TopRated';
import Restaurants from './controller/Restaurants';
import Offers from './controller/Offers';
import Login from '../../Login';
import About from '../About'
import Contact from '../Contact';
import Signup from '../../Signup';
import Mbaas from '../../Mbaas';
import UploadPhoto from '../../UploadPhoto';

import { createStackNavigator } from 'react-navigation';

const routeConfig = {
  Menu: { screen: Menu },
  About: { screen: About },
  Restaurants: { screen: Restaurants },
  TopRated: { screen: TopRated },
  Offers: { screen: Offers },
  Contact: { screen: Contact },
  Login: { screen: Login },
  Signup: { screen: Signup },
  Mbaas: { screen: Mbaas },
  UploadPhoto: { screen: UploadPhoto }  
}

const StackNavigatorConfig = {
  navigationOptions: {
    headerBackTitleStyle: {
      color: 'red',
    },
    headerTintColor: 'red'
  }
}

export default Home = createStackNavigator(routeConfig, StackNavigatorConfig);