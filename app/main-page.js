var frameModule = require("ui/frame");

var imagepickerModule = require("nativescript-imagepicker");
var bghttpModule = require("nativescript-background-http");
var session = bghttpModule.session("image-upload");

var observable = require("data/observable");
var observableArray = require("data/observable-array");

var imageItems = new observableArray.ObservableArray();
var mainViewModel = new observable.Observable();
mainViewModel.set("imageItems", imageItems);

var page;
var imageName;

function pageLoaded(args) {
	page = args.object;
    page.bindingContext = mainViewModel;
}

function onSelectMultipleTap(args) {	
	var context = imagepickerModule.create({
		mode: "multiple"
	});
	startSelection(context);
}

function onSelectSingleTap(args) {	
	var context = imagepickerModule.create({
		mode: "single"
	});
	startSelection(context);
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
        console.log("----------------");
        console.log('Status: ' + e.eventName);
        // console.log(e.object);
        if (e.totalBytes !== undefined) {
            console.log('current bytes transfered: ' + e.currentBytes);
            console.log('Total bytes to transfer: ' + e.totalBytes);
        }  
    }
    
    return task;
}

function startSelection(context) {
	context
		.authorize()
		.then(function() {
            imageItems.length = 0;
			return context.present();
		})
		.then(function(selection) {
			selection.forEach(function(selected) {
                selected.uploadTask = sendImages(selected.uri, selected.fileUri);             
                selected.imageName = imageName;
                
                console.log("----------------");
                console.log("uri: " + selected.uri);           
                console.log("fileUri: " + selected.fileUri);
                console.log('Image name:' + imageName);
                
                imageItems.push(selected);
			});
			//list.items = selection;
		}).catch(function (e) {
			console.log(e);
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