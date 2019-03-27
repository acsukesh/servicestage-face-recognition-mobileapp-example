## Step 11:(Optional) Use Multiple Image Libraries

In the demo only one image library is used to upload the photos. So the image library is hardcoded as 'apptest'.
To use different image libraries for each user when they signed in,Please follow the below steps.

1.  Check for the below code comment in {prjectrootdir}\app\data\ParseUtil.js.

```
//TODO for multiple face libraries

```

2. Comment the hardcoded image library and uncomment the actual variables.

 Eg:
 
    //TODO for multiple face libraries
    
      // ParseUtil.imageLibrary = user;     -> uncomment this line
      
      ParseUtil.imageLibrary = 'apptest';   -> comment this line