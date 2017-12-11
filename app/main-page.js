var imageSource = require("image-source");
var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var fromObject = require("data/observable").fromObject;
var ObservableArray = require("data/observable-array").ObservableArray;
var platformModule = require("platform");

var permissions = require("nativescript-permissions");
var imagepickerModule = require("nativescript-imagepicker");
var bghttpModule = require("nativescript-background-http");
var session = bghttpModule.session("image-upload");

var fs = require("file-system");

var vm = require("./main-view-model");
var mainViewModel = vm.createViewModel();

var page;
var imageName;
var counter = 0;

function pageLoaded(args) {
    page = args.object;
    page.bindingContext = mainViewModel;
}

function onSelectMultipleTap(args) {
    var context = imagepickerModule.create({
        mode: "multiple"
    });

    if (platformModule.device.os === "Android" && platformModule.device.sdkVersion >= 23) {
        permissions.requestPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE, "I need these permissions to read from storage")
            .then(function () {
                console.log("Permissions granted!");
                startSelection(context);
            })
            .catch(function () {
                console.log("Uh oh, no permissions - plan B time!");
            });
    } else {
        startSelection(context);
    }
}

function onSelectSingleTap(args) {
    var context = imagepickerModule.create({
        mode: "single"
    });

    if (platformModule.device.os === "Android" && platformModule.device.sdkVersion >= 23) {
        permissions.requestPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE, "I need these permissions to read from storage")
            .then(function () {
                console.log("Permissions granted!");
                startSelection(context);
            })
            .catch(function () {
                console.log("Uh oh, no permissions - plan B time!");
            });
    } else {
        startSelection(context);
    }
}

function sendImages(uri, fileUri) {

    imageName = extractImageName(fileUri);

    var request = {
        url: "http://httpbin.org/post",
        method: "POST",
        headers: {
            "Content-Type": "application/octet-stream",
            "File-Name": imageName
        },
        description: "{ 'uploading': " + imageName + " }"
    };

    var task = session.uploadFile(fileUri, request);

    task.on("progress", logEvent);
    task.on("error", logEvent);
    task.on("complete", logEvent);

    function logEvent(e) {
        console.log("currentBytes: " + e.currentBytes);
        console.log("totalBytes: " + e.totalBytes);
        console.log("eventName: " + e.eventName);
    }

    return task;
}

function startSelection(context) {

    context
        .authorize()
        .then(function () {

            return context.present();
        })
        .then(function (selection) {
            selection.forEach(function (selected_item) {
                selected_item.getImage().then(function (imagesource) {
                    var localPath = null;

                    if (platformModule.device.os === "Android") {
                        localPath = selected_item.android;
                    } else {
                        // selected_item.ios for iOS is PHAsset and not path - so we are creating own path
                        let folder = fs.knownFolders.documents();
                        let path = fs.path.join(folder.path, "Test" + counter + ".png");
                        let saved = imagesource.saveToFile(path, "png");

                        localPath = path;
                    }

                    if (localPath) {
                        var task = sendImages("Image" + counter + ".png", localPath);
                        mainViewModel.get("items").push(fromObject({ thumb: imagesource, uri: "Image" + counter + ".png", uploadTask: task }));
                    }
                    counter++;
                })
            });
        }).catch(function (e) {
            console.log(e.eventName);
        });
}

function extractImageName(fileUri) {
    var pattern = /[^/]*$/;
    var imageName = fileUri.match(pattern);

    return imageName;
}

function listViewItemTap(args) {

    frameModule.topmost().navigate({
        moduleName: 'full-screen-page',
        context: args.view.bindingContext
    });
}

exports.mainViewModel = mainViewModel;
exports.pageLoaded = pageLoaded;
exports.onSelectMultipleTap = onSelectMultipleTap;
exports.onSelectSingleTap = onSelectSingleTap;
exports.listViewItemTap = listViewItemTap;
