# sample-ImageUpload
An integration of nativescript-image-picker and nativescript-background-http

## iOS 
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
