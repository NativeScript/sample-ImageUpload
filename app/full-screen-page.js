var Observable = require("data/observable").Observable;
var mainViewModel = require("./main-page").mainViewModel;

var imageSource = require("image-source");
var fs = require("file-system");
var frameModule = require("ui/frame");

function navigatedTo(args) {
    var page = args.object;

    var context = page.navigationContext;
    page.bindingContext = context;

    for (const key in context) {
        if (context.hasOwnProperty(key)) {
            const element = context[key];
            console.log(element);
        }
    }

    // selectedImage.getImage({ maxWidth: 600, maxHeight: 800 }).then(function (imageSource) {
    //     console.log("Retrieved image: " + imageSource);
    //     page.bindingContext.image = imageSource;
    // }).catch(function (e) {
    //     console.log("Error: " + e);
    // });
}

function onGoBack(args) {
    frameModule.topmost().goBack();
}

exports.navigatedTo = navigatedTo;
exports.onGoBack = onGoBack;