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
import 'react-native';
import { AsyncStorage, Alert } from 'react-native'; 
import { Parse } from 'parse/react-native';

export default class ParseUtil {
    //TODO update the below host details(hostIP,port) with valid values before running the app
    static hostIP = '';
    //Configure port only when required.If hostIP contains the complete mbaas instance details, no need to configure port
    static port = '';
    
    static imageLibrary = null;
    static timerHandle=null;

    static getRestaurants(callback) {
       init(); 
        
        var restaurants = Parse.Object.extend("Restaurants");
        var query = new Parse.Query(restaurants);
        
        return query.find().then((results) => {
            var restaurantResults = [];
             // Parse the returned Parse.Object values
            for (let i = 0; i < results.length; i++) {
            var object = results[i];
            var restaurantDetails={};
            restaurantDetails.name = object.get('name');
            restaurantDetails.description = object.get('description');
            restaurantDetails.phone = object.get('phone');
            restaurantDetails.image = object.get('photo').url();
            
            restaurantResults.push(restaurantDetails);
            } 
            callback(restaurantResults);
      });
    }

    static getTopRated(callback) {
        init(); 
         
         var toprated = Parse.Object.extend("TopRated");
         var query = new Parse.Query(toprated);
         
         return query.find().then((results) => {
             var topratedResults = [];
              // Parse the returned Parse.Object values
             for (let i = 0; i < results.length; i++) {
             var object = results[i];
             var topratedDetails={};
             topratedDetails.name = object.get('name');
             topratedDetails.description = object.get('description');
             topratedDetails.phone = object.get('phone');
             topratedDetails.image = object.get('photo').url();
             topratedResults.push(topratedDetails);
             } 
             callback(topratedResults);
       });
     }

     static getOffers(callback) {
        init(); 
         
         var offers = Parse.Object.extend("Offers");
         var query = new Parse.Query(offers);
         
         return query.find().then((results) => {
             var offersResults = [];
             for (let i = 0; i < results.length; i++) {
             var object = results[i];
             var offersDetails={};
             offersDetails.image = object.get('photo').url();
             offersResults.push(offersDetails);
             } 
             callback(offersResults);
       });       
     }

     static login(user,pass,callback) {
        init(); 
        ParseUtil.timerHandle = setTimeout(() => { 
          ParseUtil.timerHandle = null;
          callback('Request timed out.');
        }, 60000); 

        const userResult = Parse.User.logIn(user, pass).then((results) => {
          if(ParseUtil.timerHandle==null)
          {
            return;
          }
          clearTimeout(ParseUtil.timerHandle);
          console.log("login success ;;;;;;;;;");
          //TODO for multiple face libraries
          // ParseUtil.imageLibrary = user;
          ParseUtil.imageLibrary = 'apptest';
          _storeData();
            callback("success");
         }, (error) => {
          if(ParseUtil.timerHandle==null)
          {
            return;
          }
          clearTimeout(ParseUtil.timerHandle);
          console.log("logiv failed ;;;;;;;;;"+error.message);
            callback(error.message);
         });
       
     }

     static signup(username,pass,email,callback) {
        init(); 
        Parse.User.logOut(); 
        var user = new Parse.User();
        user.set("username", username);
        user.set("password", pass);
        user.set("email", email);
        ParseUtil.timerHandle = setTimeout(() => { 
          ParseUtil.timerHandle = null;
          callback('Request timed out.');
        }, 60000); 

        user.signUp(null, {
            success: function(user) {
             if(ParseUtil.timerHandle==null)
              {
                return;
              }
              clearTimeout(ParseUtil.timerHandle);
              //TODO for multiple face libraries
              // ParseUtil.imageLibrary = username;
              ParseUtil.imageLibrary = 'apptest';
              _storeData();
              ParseUtil.createImageLib();
              callback("success");
              
            },
            error: function(user, error) {
              if(ParseUtil.timerHandle==null)
              {
                return;
              }
              clearTimeout(ParseUtil.timerHandle);
              callback(error.message);
            }
          });
     }

     static logout() {
        init(); 
        Parse.User.logOut().then(() => {
            console.log("logout success ;;;;;;;;;");
          });
     }

     static uploadImage(filebase64,callback,loadingcall) {
        init(); 
        //TODO for multiple face libraries
        // const params =  { path: filebase64, imageLibrary: ParseUtil.imageLibrary };
        const params =  { path: filebase64, imageLibrary: 'apptest' };
        console.log("using image library :"+params.imageLibrary);
        
        ParseUtil.timerHandle = setTimeout(() => { 
          loadingcall();  
          ParseUtil.timerHandle = null;
          Alert.alert(
            'Error',
            'Failed to Upload Photo. Request timed out.',
            [
                {text: 'OK', onPress: () => 
                {
                  callback("uploadFailed");
            }
            },
            ],
            { cancelable: false }
            )
        }, 240000);  

        Parse.Cloud.run("faceUpload", params)
        .then((data) => {
          console.log("upload Complete");
          if(ParseUtil.timerHandle==null)
          {
            return;
          }
          loadingcall();
          clearTimeout(ParseUtil.timerHandle);
          if(data == 'SUCCESS')
          {
          callback("success");
          }
          else{
            Alert.alert(
              'Failed',
              "Failed to Upload Photo.Please input valid user photo.",
              [
                  {text: 'OK', onPress: () => 
                  {
                  callback("uploadFailed");
              }
              },
              ],
              { cancelable: false }
              )
          }
        });
     }


     static createImageLib() {
      init(); 
      //TODO for multiple face libraries
      // const params =  { imageLibrary: ParseUtil.imageLibrary };
      const params =  { imageLibrary: 'apptest' };
      console.log("using image library :"+params.imageLibrary);
      
      Parse.Cloud.run("faceLibrary", params)
      .then((data) => {
        if(data == 'SUCCESS')
        {
        console.log("create library Complete "+data);
        }
        else
        {
          console.log("Failed to create image library."+data);
        }
        
      });
   }

     static retrieveImage(filebase64,callback,loadingcall) {
      init(); 
      if(ParseUtil.imageLibrary == null)
      {
        _retrieveData(filebase64,callback,loadingcall);
      }
      else{
       //TODO for multiple face libraries
       const params =  { path: filebase64, imageLibrary: 'apptest' };
      //  const params =  { path: filebase64, imageLibrary: ParseUtil.imageLibrary };
       console.log("using image library :"+params.imageLibrary);
      
       ParseUtil.timerHandle = setTimeout(() => { 
        loadingcall();  
        ParseUtil.timerHandle = null;
        Alert.alert(
          'Error',
          'Failed to retrieve the Photo. Request timed out.',
          [
              {text: 'OK', onPress: () => 
              {
                callback("faceFailed");
          }
          },
          ],
          { cancelable: false }
          )
      }, 240000);  

      Parse.Cloud.run("faceRetrieve", params)
        .then((data) => {
          console.log("upload Complete");
          if(ParseUtil.timerHandle==null)
          {
            return;
          }
          loadingcall();
          clearTimeout(ParseUtil.timerHandle);
          if(data == 'SUCCESS')
          {
            callback("success");
          }
          else{
          Alert.alert(
            'Failed',
            "Failed to recognize the user.Please input valid user photo.",
            [
                {text: 'OK', onPress: () => 
                {
                callback("faceFailed");
            }
            },
            ],
            { cancelable: false }
            )
        }
        });
      }
   }

}

   const _storeData = async () => {
      try {
        await AsyncStorage.setItem('imageLibrary', ParseUtil.imageLibrary);
      } catch (error) {
        // Error saving data
      }
    };

    const _retrieveData = async (filebase64,callback,loadingcall) => {
      try {
        const value = await AsyncStorage.getItem('imageLibrary');
        if (value !== null) {
          // We have data!!
          console.log('imageLibrary'+value);
          ParseUtil.imageLibrary = value;
          if(filebase64 != undefined)
          {
            ParseUtil.retrieveImage(filebase64,callback,loadingcall);
          }
        }
      } catch (error) {
        // Error retrieving data
      }
    };

    const init = () =>
    {
      _retrieveData();
      Parse.setAsyncStorage(AsyncStorage);
      Parse.initialize("myAppId");
      if(ParseUtil.port == undefined || ParseUtil.port == "" )
      {
        console.log('http://'+ParseUtil.hostIP+'/mbaas');
        Parse.serverURL = 'http://'+ParseUtil.hostIP+'/mbaas';
      }
      else{
        console.log('http://'+ParseUtil.hostIP+':'+ParseUtil.port+'/mbaas');
        Parse.serverURL = 'http://'+ParseUtil.hostIP+':'+ParseUtil.port+'/mbaas';
      }
    }