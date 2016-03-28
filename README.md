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

## note

If you test this example via emulator you will need to save some images to your emulator storage.
```
1. open a browser 
2. find & long-press an image 
3. save
```
