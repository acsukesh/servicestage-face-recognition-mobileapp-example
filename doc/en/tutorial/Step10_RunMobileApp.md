## Step 10:  Run Mobile App in emulator

At this point, setup of the Mobile Application sample, Android Studio and Emulator should be completed.  Follow the instructions below to run the Mobile Application the Emulator.  

1.	**Important**:  If you are developing behind a proxy, proxy may return **Accept Risk page** when the emulator connects to the Mobile Backend.  Before continuing, follow Step 4 to open Mobile Backend Dashboard in your browser and **Accept Risk**.  Keep the Mobile Backend Dashboard alive in the web browser to prevent the proxy from viewing the **Accept Risk** page again.

2. Open a command prompt, go to C:\Users\{{Your Username}}\AppData\Local\Android\Sdk\emulator, where the emulator.exe is located.  

3. Find out the list of emulator by running the following command.  

```
   emulator -list-avds  
```

4. Start emulator using the following command.  Emulator should show up.  

```
   emulator -avd {{avd_name}}
```
![s8e](./imgs/s8e.png) 

5.	Open another command prompt, change to **{{path to}}/facerecodemo**.  

6.	Run the following command to bundle the react native code.   

```
   react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```

7.  Run the following command to run the sample mobile application in the running emulator.  

```
   react-native run-android
```
![s8d](./imgs/mobile3.png) 

8. Signup with username,password and email address.

![s8f](./imgs/s8f.png) 

9. On successful signup, login to the app. After login click on upload photo to upload the photo to Face Recognition Service image library.

![s8g](./imgs/s8g.png) 

10. Select the photo from mobile gallery. On photo selection the upload request will be sent to server and loading icon will be shown till the request is complete. After upload complete the upload status(success/fail) is displayed.

11. Logout from the app.  At this point, you can login again by uploading your photo.  You may upload a previously captured photo from gallery if you are using emulator; or take a new photo of yourself if you are using mobile phone.  Your photo will be sent to Face Recognition Service for validation.


