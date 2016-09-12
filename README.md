# sample-ImageUpload
Sample app showing an integration of nativescript-image-picker and nativescript-background-http plugins.

## Usage

Connect your device or start your prefered emulator/simulator.
Tnen from the root app directory start your cmd/shell

for android
```
tns run android
```

for ios
```
tns run ios
```
Alternativly you can use the livesync command.
For better understanding of the tns commands [please follow this link](http://docs.nativescript.org/start/getting-started#development-workflow)

## iOS * 
Please note the `NSAppTransportSecurity` key in the `app/App_Resources/iOS/Info.plist`:
```
	<key>NSAppTransportSecurity</key>
	<dict>
		<key>NSAllowsArbitraryLoads</key>
		<true/>
	</dict>
```
This allows uploads to non secure servers.

## Android * 
For Android SDK 23 and newer versions an explicit permissions are required from the user.
In this app [https://www.npmjs.com/package/nativescript-permissions](nativescript-permissions) plugin was used to require permission for reading from the app storage.
For lower SDK versions the permissions are set in _App_Resources/Android/AndroidManifest.xml_

```
    if (platformModule.device.os === "Android" && platformModule.device.sdkVersion >= 23)  {   
        permissions.requestPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE, "I need these permissions to read from storage")
        .then(function() {
            console.log("Permissions granted!");
            startSelection(context);
        })
        .catch(function() {
            console.log("Uh oh, no permissions - plan B time!");
        });
    } else {
        startSelection(context); // lower SDK versions will grant permission from AndroidManifest file
    }	

```
This allows uploads to non secure servers.

> Note
>
> If you test this example via emulator you will need to save some images to your emulator storage.
> ```
> 1. open a browser 
> 2. find & long-press an image 
> 3. save
> ```
